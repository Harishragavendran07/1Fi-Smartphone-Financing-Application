import { useLocation, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, variant, plan } = location.state || {};

  if (!product || !variant || !plan) {
    return (
      <div className="checkout-empty">
        <h2>No EMI plan selected</h2>

        <button onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  const handleContinue = () => {
    navigate("/application", {
      state: {
        product,
        variant,
        plan,
      },
    });
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="checkout-logo">1Fi</div>
      </header>

      <div className="checkout-container">
        <section className="checkout-product">
          <p className="checkout-brand">{product.brand}</p>

          <h1>{product.name}</h1>

          <div className="checkout-image-wrapper">
            <img
              src={variant.imageUrl}
              alt={product.name}
              className="checkout-image"
            />
          </div>
        </section>

        <section className="checkout-summary">
          <h2>Application Summary</h2>

          <div className="summary-item">
            <span>Variant</span>
            <strong>
              {variant.color} - {variant.storage}
            </strong>
          </div>

          <div className="summary-item">
            <span>Product Price</span>
            <strong>
              ₹{Number(variant.price).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="summary-item">
            <span>Monthly EMI</span>
            <strong>
              ₹{Number(plan.monthlyAmount).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="summary-item">
            <span>Tenure</span>
            <strong>{plan.tenureMonths} Months</strong>
          </div>

          <div className="summary-item">
            <span>Interest Rate</span>
            <strong>{plan.interestRate}%</strong>
          </div>

          <div className="summary-item">
            <span>Cashback</span>
            <strong>
              ₹{Number(plan.cashback).toLocaleString("en-IN")}
            </strong>
          </div>

          <button
            className="continue-button"
            onClick={handleContinue}
          >
            Continue Application
          </button>
        </section>
      </div>
    </div>
  );
}

export default CheckoutPage;