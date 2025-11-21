import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { customerApi } from "../api/customerApi";
import Navbar1 from "../components/Navbar1"; // ✅ Navbar
import Footer from "../components/Footer";   // ✅ Footer
import "../styles/register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await customerApi.post("/register", form);
      alert("Registration successful!");
      navigate("/login"); // redirect after success
    } catch (err) {
      alert("Registration failed. Please try again!");
      console.error(err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar1 />

      {/* Page Container */}
      <div className="reg-container">
        <div className="reg-card">
          <h2>Register</h2>

          <form onSubmit={handleRegister}>
            <input
              className="reg-input"
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="reg-input"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="reg-input"
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              className="reg-input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button className="reg-btn" type="submit">
              Register
            </button>
          </form>

          <p className="reg-bottom-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
