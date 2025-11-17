import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginCustomer() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8083/customer-app/customers";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, form, { headers: { "Content-Type": "application/json" } });
      if (res.data) {
        alert("Login successful!");
        navigate("/admin"); // go to admin dashboard
      } else {
        alert("Invalid email/password");
      }
    } catch (err) {
      console.error(err);
      alert("Login error!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={login} style={styles.form}>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={styles.input} />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" style={styles.input} />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>Not registered? <Link to="/">Register here</Link></p>
    </div>
  );
}

const styles = {
  container: { width: "400px", margin: "50px auto", textAlign: "center", border: "1px solid #ccc", padding: "20px", borderRadius: "10px", background: "#f9f9f9" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", background: "#2196F3", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }
};
