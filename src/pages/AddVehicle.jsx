import React, { useState } from "react";
import api from "../api/api";

function AddVehicle() {
  const [vehicle, setVehicle] = useState({
    company: "",
    model: "",
    year: "",
    price: "",
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    api.post("/vehicles", vehicle).then(() => {
      alert("Vehicle added!");
      window.location.href = "/admin";
    });
  };

  return (
    <div>
      <h2>Add Vehicle</h2>
      <form onSubmit={submit}>
        <input name="company" placeholder="Company" onChange={handleChange} /><br />
        <input name="model" placeholder="Model" onChange={handleChange} /><br />
        <input name="year" placeholder="Year" onChange={handleChange} /><br />
        <input name="price" placeholder="Price" onChange={handleChange} /><br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddVehicle;
