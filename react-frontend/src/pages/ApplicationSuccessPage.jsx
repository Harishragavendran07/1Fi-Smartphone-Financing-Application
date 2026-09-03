import { Link, useLocation, useNavigate } from "react-router-dom";

function ApplicationSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    applicant,
    product,
    variant,
    plan,
    application
  } = location.state || {};

  if (!applicant || !product || !variant || !plan || !application) {
    return (
      <div className="success-empty">
        <h2>No application found</h2>

        <button onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
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

      <main className="success-page">
        <section className="success-container">
          <div className="success-icon">✓</div>

          <p className="success-tag">APPLICATION SUBMITTED</p>

          <h1>Thank you, {applicant.fullName}!</h1>

          <p className="success-message">
            Your smartphone financing application has been submitted
            successfully. We will review your application and update you soon.
          </p>

          <div className="application-id">
            Application ID: <strong>#{application.id}</strong>
          </div>

          <div className="success-details">
            <h2>Application Details</h2>

            <div>
              <span>Application Status</span>
              <strong>{application.status}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{applicant.email}</strong>
            </div>

            <div>
              <span>Mobile</span>
              <strong>{applicant.phone}</strong>
            </div>

            <div>
              <span>Employment</span>
              <strong>{applicant.employmentType}</strong>
            </div>

            <div>
              <span>Selected Phone</span>
              <strong>{product.name}</strong>
            </div>

            <div>
              <span>Variant</span>
              <strong>
                {variant.color} - {variant.storage}
              </strong>
            </div>

            <div>
              <span>Monthly EMI</span>
              <strong>
                ₹{Number(plan.monthlyAmount).toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>EMI Tenure</span>
              <strong>{plan.tenureMonths} Months</strong>
            </div>

            <div>
              <span>Cashback</span>
              <strong>
                ₹{Number(plan.cashback).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          <Link to="/" className="success-home-button">
            Back to Home
          </Link>
        </section>
      </main>
    </div>
  );
}

export default ApplicationSuccessPage;