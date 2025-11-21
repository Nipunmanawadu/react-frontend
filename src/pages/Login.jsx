import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { customerApi } from "../api/customerApi";
import "../styles/customer.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    // ----------------------------
    // ✅ 1. ADMIN LOGIN CHECK
    // ----------------------------
    if (form.email === "admin" && form.password === "123") {
      localStorage.setItem("customerName", "Admin");
      localStorage.setItem("customerEmail", "admin");
      localStorage.setItem("customerRole", "admin");

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard"); // Admin dashboard
      }, 1500);
      return;
    }

    // ----------------------------
    // ✅ 2. CUSTOMER LOGIN
    // ----------------------------
    try {
      const res = await customerApi.post("/login", form);

      if (res.data) {
        // Save values individually
        localStorage.setItem("customerId", res.data.id);
        localStorage.setItem("customerName", res.data.name);
        localStorage.setItem("customerEmail", res.data.email);
        localStorage.setItem("customerPhone", res.data.phone);

        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/view"); // Redirect to customer profile/dashboard
        }, 1500);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <>
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            placeholder="Email or Admin"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <p>Welcome! You have successfully logged in.</p>
        </div>
      )}
    </>
  );
}
