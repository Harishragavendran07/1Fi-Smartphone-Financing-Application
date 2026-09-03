import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ApplicationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { product, variant, plan } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    employmentType: "",
    monthlyIncome: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!product || !variant || !plan) {
    return (
      <div className="checkout-empty">
        <h2>No product or EMI plan selected</h2>

        <button onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      return "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.dateOfBirth) {
      return "Please select your date of birth.";
    }

    if (!formData.employmentType) {
      return "Please select your employment type.";
    }

    if (!formData.monthlyIncome || Number(formData.monthlyIncome) <= 0) {
      return "Please enter a valid monthly income.";
    }

    if (!formData.address.trim()) {
      return "Please enter your address.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          employmentType: formData.employmentType,
          monthlyIncome: Number(formData.monthlyIncome),
          address: formData.address.trim(),
          productId: product.id,
          variantId: variant.id,
          emiPlanId: plan.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application.");
      }

      navigate("/application-success", {
        state: {
          applicant: formData,
          product,
          variant,
          plan,
          application: data.application,
        },
      });
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please check your backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <Link to="/" className="logo">
          1Fi
        </Link>

        <nav>
          <Link to="/products/apple-iphone-17-pro">iPhone</Link>
          <Link to="/products/samsung-galaxy-s24-ultra">Samsung</Link>
          <Link to="/products/google-pixel-9-pro">Pixel</Link>
        </nav>
      </header>

      <main className="application-page">
        <section className="application-form-container">
          <p className="form-tag">COMPLETE YOUR APPLICATION</p>

          <h1>Tell us about yourself</h1>

          <p className="form-description">
            Fill in your details to continue with your smartphone financing
            application.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Employment Type</label>

                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select employment type</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Student">Student</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Monthly Income</label>

              <input
                type="number"
                name="monthlyIncome"
                placeholder="Enter your monthly income"
                value={formData.monthlyIncome}
                onChange={handleChange}
                min="1"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Address</label>

              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                disabled={loading}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              className="submit-application-button"
              disabled={loading}
            >
              {loading ? "Submitting Application..." : "Submit Application"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ApplicationPage;