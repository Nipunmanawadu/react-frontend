import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { customerApi } from "../api/customerApi";
import Navbar1 from "../components/Navbar1";   // ✅ Navbar
import Footer from "../components/Footer";     // ✅ Footer
import "../styles/login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    // Admin Login
    if (form.email === "admin" && form.password === "123") {
      localStorage.setItem("customerName", "Admin");
      localStorage.setItem("customerEmail", "admin");

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 1500);
      return;
    }

    // Customer Login
    try {
      const res = await customerApi.post("/login", form);

      if (res.data) {
        localStorage.setItem("customerId", res.data.id);
        localStorage.setItem("customerName", res.data.name);
        localStorage.setItem("customerEmail", res.data.email);
        localStorage.setItem("customerPhone", res.data.phone);

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/view");
        }, 1500);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar1 />

      {/* Login Container */}
      <div className="lg-container">
        <div className="lg-card">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email or Admin"
              value={form.email}
              onChange={handleChange}
              required
              className="lg-input"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="lg-input"
            />

            <button type="submit" className="lg-btn">Login</button>
          </form>

          <p className="lg-bottom-text">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>

        {/* Popup message */}
        {showPopup && (
          <div className="lg-popup">
            Welcome! Login Successful.
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
