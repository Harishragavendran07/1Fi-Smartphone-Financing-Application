import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="app">
      <header>
        <Link to="/" className="logo">
          1Fi
        </Link>

        <nav>
          <Link to="/products/apple-iphone-17-pro">
            iPhone
          </Link>

          <Link to="/products/samsung-galaxy-s24-ultra">
            Samsung
          </Link>

          <Link to="/products/google-pixel-9-pro">
            Pixel
          </Link>
        </nav>
      </header>

      <section className="home">
        <div className="hero">
          <p className="hero-tag">SMART FINANCING MADE SIMPLE</p>

          <h1>Buy your next phone with easy EMI.</h1>

          <p>
            Choose your smartphone, select a variant, compare EMI plans,
            and find the payment option that works for you.
          </p>
        </div>

        <section className="products-section">
          <h2>Featured Smartphones</h2>

          <div className="products-grid">
            {products.map((product) => {
              const firstVariant = product.variants?.[0];

              return (
                <Link
                  to={`/products/${product.slug}`}
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-card-image">
                    {firstVariant && (
                      <img
                        src={firstVariant.imageUrl}
                        alt={product.name}
                      />
                    )}
                  </div>

                  <div className="product-card-content">
                    <p>{product.brand}</p>

                    <h3>{product.name}</h3>

                    <span>
                      Starting from ₹
                      {firstVariant
                        ? Number(firstVariant.price).toLocaleString("en-IN")
                        : "N/A"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}

export default HomePage;