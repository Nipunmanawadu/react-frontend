import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { customerApi } from "../api/customerApi";
import NavBar from "../components/Navbar";
import "../styles/customer.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPopup, setShowPopup] = useState(false); // popup state
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("customer"));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await customerApi.post("/login", form);
      if (res.data) {
        localStorage.setItem("customer", JSON.stringify(res.data));

        // Show popup
        setShowPopup(true);

        // Hide popup after 2 seconds and navigate
        setTimeout(() => {
          setShowPopup(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <>
      <NavBar user={user} />
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
