import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://onefi-smartphone-financing-backend.onrender.com/api/products/${slug}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        if (data.success && data.product) {
          const firstVariant = data.product.variants?.[0];
          const firstPlan = firstVariant?.emiPlans?.[0];

          setProduct(data.product);
          setSelectedVariant(firstVariant || null);
          setSelectedPlan(firstPlan || null);
        } else {
          setProduct(null);
          setError("Product not found");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
        setError("Unable to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedPlan(variant.emiPlans?.[0] || null);
  };

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error || !product || !selectedVariant) {
    return <h2>{error || "Product not found"}</h2>;
  }

  return (
    <div>
      <header>
        <Link to="/">1Fi</Link>

        <nav>
          <Link to="/products/apple-iphone-17-pro">iPhone</Link>
          <Link to="/products/samsung-galaxy-s24-ultra">Samsung</Link>
          <Link to="/products/google-pixel-9-pro">Pixel</Link>
        </nav>
      </header>

      <main>
        <div>
          <img
            src={selectedVariant.imageUrl}
            alt={`${product.name} ${selectedVariant.color}`}
          />
        </div>

        <div>
          <p>{product.brand}</p>

          <h1>{product.name}</h1>

          <p>{product.description}</p>

          <h3>Select Variant</h3>

          <div className="variant-buttons">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                className={
                  selectedVariant.id === variant.id
                    ? "variant-button selected"
                    : "variant-button"
                }
                onClick={() => handleVariantChange(variant)}
              >
                {variant.color} - {variant.storage}
              </button>
            ))}
          </div>

          <h2>
            ₹{Number(selectedVariant.price).toLocaleString("en-IN")}
          </h2>

          <p>
            MRP: ₹{Number(selectedVariant.mrp).toLocaleString("en-IN")}
          </p>

          <h3>Choose an EMI Plan</h3>

          {selectedVariant.emiPlans?.length > 0 ? (
            <div className="emi-plans">
              {selectedVariant.emiPlans.map((plan) => (
                <label
                  key={plan.id}
                  className={
                    selectedPlan?.id === plan.id
                      ? "emi-plan selected"
                      : "emi-plan"
                  }
                >
                  <input
                    type="radio"
                    name="emiPlan"
                    checked={selectedPlan?.id === plan.id}
                    onChange={() => setSelectedPlan(plan)}
                  />

                  <div>
                    <strong>
                      ₹
                      {Number(plan.monthlyAmount).toLocaleString("en-IN")} /
                      month
                    </strong>

                    <p>
                      {plan.tenureMonths} Months · {plan.interestRate}% Interest
                    </p>

                    <p>
                      Cashback ₹
                      {Number(plan.cashback).toLocaleString("en-IN")}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <p>No EMI plans available for this variant.</p>
          )}

          <button
            className="proceed-button"
            disabled={!selectedPlan}
            onClick={() =>
              navigate("/checkout", {
                state: {
                  product,
                  variant: selectedVariant,
                  plan: selectedPlan,
                },
              })
            }
          >
            Proceed with Selected Plan
          </button>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;