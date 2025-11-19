import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customerApi } from "../api/customerApi";
import NavBar from "../components/Navbar";
import "../styles/global.css";

export default function EditCustomer() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const res = await customerApi.get(`/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("Failed to load customer");
      }
    };
    loadCustomer();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await customerApi.put(`/${id}`, form);
      alert("Customer updated!");
      navigate("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <>
      <NavBar onLogout={() => { localStorage.removeItem("customer"); navigate("/"); }} />
      <div className="card">
        <h2>Edit Customer</h2>
        <form onSubmit={handleUpdate}>
          <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" required />
          <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" required />
          <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" required />
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
}
