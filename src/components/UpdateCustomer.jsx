import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateCustomer({ selected, refresh, clear }) {
  const [form, setForm] = useState(selected);
  const BASE_URL = "http://localhost:8083/customer-app/customers";

  useEffect(() => setForm(selected), [selected]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const updateCustomer = async (e) => {
    e.preventDefault();
    if (!form || !form.id) return;
    try {
      await axios.put(`${BASE_URL}/${form.id}`, form, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Updated!");
      refresh();
      clear();
    } catch (err) {
      console.error(err);
      alert("Error updating customer!");
    }
  };

  if (!form) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Update Customer</h3>
      <form onSubmit={updateCustomer}>
        <input name="name" value={form.name} onChange={handleChange} /><br /><br />
        <input name="email" value={form.email} onChange={handleChange} /><br /><br />
        <input name="password" value={form.password} onChange={handleChange} /><br /><br />
        <input name="phone" value={form.phone} onChange={handleChange} /><br /><br />
        <button type="submit">Save</button>
        <button type="button" onClick={clear} style={{ marginLeft: "10px" }}>Cancel</button>
      </form>
    </div>
  );
}
