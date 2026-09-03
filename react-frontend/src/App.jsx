import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationSuccessPage from "./pages/ApplicationSuccessPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/products/:slug"
          element={<ProductPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/application"
          element={<ApplicationPage />}
        />

        <Route
          path="/application-success"
          element={<ApplicationSuccessPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;