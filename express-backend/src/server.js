const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "1Fi Backend API is running"
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "1Fi backend and database are running",
      databaseTime: result.rows[0].now
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.slug,
        p.brand,
        p.description,
        p.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pv.id,
              'color', pv.color,
              'storage', pv.storage,
              'mrp', pv.mrp,
              'price', pv.price,
              'imageUrl', pv.image_url,
              'stock', pv.stock
            )
          ) FILTER (WHERE pv.id IS NOT NULL),
          '[]'
        ) AS variants
      FROM products p
      LEFT JOIN product_variants pv ON pv.product_id = p.id
      GROUP BY p.id
      ORDER BY p.id;
    `);

    res.json({
      success: true,
      products: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
});

app.get("/api/products/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const productResult = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        brand,
        description,
        created_at
      FROM products
      WHERE slug = $1
      `,
      [slug]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const product = productResult.rows[0];

    const variantsResult = await pool.query(
      `
      SELECT
        pv.id,
        pv.color,
        pv.storage,
        pv.mrp,
        pv.price,
        pv.image_url AS "imageUrl",
        pv.stock,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ep.id,
              'tenureMonths', ep.tenure_months,
              'interestRate', ep.interest_rate,
              'monthlyAmount', ep.monthly_amount,
              'cashback', ep.cashback
            )
          ) FILTER (WHERE ep.id IS NOT NULL),
          '[]'
        ) AS "emiPlans"
      FROM product_variants pv
      LEFT JOIN emi_plans ep ON ep.variant_id = pv.id
      WHERE pv.product_id = $1
      GROUP BY
        pv.id,
        pv.color,
        pv.storage,
        pv.mrp,
        pv.price,
        pv.image_url,
        pv.stock
      ORDER BY pv.id
      `,
      [product.id]
    );

    product.variants = variantsResult.rows;

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product details"
    });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      employmentType,
      monthlyIncome,
      address,
      productId,
      variantId,
      emiPlanId
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !employmentType ||
      !monthlyIncome ||
      !address ||
      !productId ||
      !variantId ||
      !emiPlanId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO applications (
        full_name,
        email,
        phone,
        date_of_birth,
        employment_type,
        monthly_income,
        address,
        product_id,
        variant_id,
        emi_plan_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
      `,
      [
        fullName,
        email,
        phone,
        dateOfBirth,
        employmentType,
        monthlyIncome,
        address,
        productId,
        variantId,
        emiPlanId
      ]
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit application"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});