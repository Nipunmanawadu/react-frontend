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

    // Check for default Admin credentials first
    if (form.email === "admin" && form.password === "123") {
      localStorage.setItem(
        "customer",
        JSON.stringify({ role: "admin", name: "Admin" })
      );

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard"); // Redirect to Admin Dashboard
      }, 1500);
      return;
    }

    // Regular customer login
    try {
      const res = await customerApi.post("/login", form);
      if (res.data) {
        localStorage.setItem("customer", JSON.stringify(res.data));

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/view"); // Regular user dashboard
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

      {/* Welcome popup */}
      {showPopup && (
        <div className="popup">
          <p>Welcome! You have successfully logged in.</p>
        </div>
      )}
    </>
  );
}
