import React, { useState, useEffect } from "react";
import { customerApi } from "../api/api";
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await customerApi.get("/");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading customers!");
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await customerApi.delete(`/${id}`);
      alert("Deleted!");
      loadCustomers();
    } catch (err) {
      console.error(err);
      alert("Error deleting customer!");
    }
  };

  const selectCustomer = (c) => {
    setSelected(c);
    setForm({ ...c });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      await customerApi.put(`/${form.id}`, form);
      alert("Updated!");
      setSelected(null);
      loadCustomers();
    } catch (err) {
      console.error(err);
      alert("Error updating customer!");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard - Customers</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => selectCustomer(c)} className="updateBtn">Update</button>
                <button onClick={() => deleteCustomer(c.id)} className="deleteBtn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="updateForm">
          <h3>Update Customer</h3>
          <form onSubmit={updateCustomer} className="form">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
            <button type="submit" className="updateBtn">Save</button>
            <button type="button" onClick={() => setSelected(null)} className="deleteBtn">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
