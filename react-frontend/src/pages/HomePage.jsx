import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://onefi-smartphone-financing-backend.onrender.com/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="loading">{error}</div>;
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

      <main>
        <section className="home">
          <div className="hero">
            <p className="hero-tag">
              SMART FINANCING MADE SIMPLE
            </p>

            <h1>Buy your next phone with easy EMI.</h1>

            <p>
              Choose your smartphone, select a variant, compare EMI plans,
              and find the payment option that works for you.
            </p>
          </div>

          <section className="products-section">
            <h2>Featured Smartphones</h2>

            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
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
                        {firstVariant?.imageUrl ? (
                          <img
                            src={firstVariant.imageUrl}
                            alt={product.name}
                          />
                        ) : (
                          <div>No image available</div>
                        )}
                      </div>

                      <div className="product-card-content">
                        <p>{product.brand}</p>

                        <h3>{product.name}</h3>

                        <span>
                          Starting from ₹
                          {firstVariant
                            ? Number(firstVariant.price).toLocaleString(
                                "en-IN"
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default HomePage;