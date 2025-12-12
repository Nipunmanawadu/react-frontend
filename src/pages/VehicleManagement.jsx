import React, { useState, useEffect } from "react";
import { vehicleApi } from "../api/vehicleApi";
import "../styles/vehicleM.css";
import "../styles/Footer.css";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar1";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ id: "", company: "", model: "", year: "", price: "", photoUrl: "" });
  const [editing, setEditing] = useState(false);

  const fetchVehicles = async () => {
    try {
      const res = await vehicleApi.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();  
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await vehicleApi.put(`/vehicles/${form.id}`, form);
      } else {
        await vehicleApi.post("/vehicles", form);
      }

      setForm({ id: "", company: "", model: "", year: "", price: "", photoUrl: "" });
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
        await vehicleApi.delete(`/vehicles/${id}`);
        fetchVehicles();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Navbar1 />
       <div className="dashboard-bg">

      <div className="vm-container">
        <h2 className="vm-title">{editing ? "Update Vehicle" : "Add Vehicle"}</h2>

        <form className="vm-form" onSubmit={handleSubmit}>
          <input className="vm-input" type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
          <input className="vm-input" type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
          <input className="vm-input" type="number" name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
          <input className="vm-input" type="number" step="0.01" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input className="vm-input" type="url" name="photoUrl" placeholder="Photo URL" value={form.photoUrl} onChange={handleChange} />

          <button className="vm-submit" type="submit">{editing ? "Update" : "Add"}</button>

          {editing && (
            <button
              className="vm-cancel"
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({ id: "", company: "", model: "", year: "", price: "", photoUrl: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <h2 className="vm-title">Vehicle List</h2>

        <table className="vm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Photo</th>
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
                  {v.photoUrl ? (
                    <img
                      className="vm-photo"
                      src={v.photoUrl}
                      alt={`${v.company} ${v.model}`}
                    />
                  ) : "N/A"}
                </td>

                <td>
                  <div className="vm-actions">
                    <button className="vm-edit" onClick={() => handleEdit(v)}>Edit</button>
                    <button className="vm-delete" onClick={() => handleDelete(v.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      <Footer />
    </>
  );
}

export default VehicleManagement;
