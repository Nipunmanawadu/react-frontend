import React, { useState, useEffect } from "react";
import { vehicleApi } from "../api/vehicleApi"; // import the axios instance
import "./styles.css";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ id: "", company: "", model: "", year: "", price: "" });
  const [editing, setEditing] = useState(false);

  const fetchVehicles = async () => {
    try {
      const res = await vehicleApi.get("/");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await vehicleApi.put(`/${form.id}`, form);
      } else {
        await vehicleApi.post("/", form);
      }
      setForm({ id: "", company: "", model: "", year: "", price: "" });
      setEditing(false);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (vehicle) => {
    setForm(vehicle);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await vehicleApi.delete(`/${id}`);
        fetchVehicles();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <h2>{editing ? "Update Vehicle" : "Add Vehicle"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
        <input type="number" name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
        <input type="number" step="0.01" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && (
          <button type="button" onClick={() => { setEditing(false); setForm({ id: "", company: "", model: "", year: "", price: "" }); }}>
            Cancel
          </button>
        )}
      </form>

      <h2>Vehicle List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.company}</td>
              <td>{v.model}</td>
              <td>{v.year}</td>
              <td>{v.price}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(v)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(v.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleManagement;
