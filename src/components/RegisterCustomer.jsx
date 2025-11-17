import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/RegisterCustomer.css';

export default function RegisterCustomer() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8083/customer-app/customers";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/register`, form, { headers: { "Content-Type": "application/json" } });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error registering!");
    }
  };

  return (
    <div className="formContainer">
      <h2>Register</h2>
      <form onSubmit={register} className="formField">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="inputField" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="inputField" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="inputField" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="inputField" />
        <button type="submit" className="submitBtn">Register</button>
      </form>
      <p>Already registered? <Link to="/login">Login here</Link></p>
    </div>
  );
}
