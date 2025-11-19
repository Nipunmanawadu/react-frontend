import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { customerApi } from "../api/customerApi";
import NavBar from "../components/Navbar";
import "../styles/global.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("customer"));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await customerApi.post("/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <>
      <NavBar user={user} />
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
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
          <button type="submit">Register</button>
        </form>
        <p style={{ marginTop: "15px" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </>
  );
}
