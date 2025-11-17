import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function UpdateVehicle() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({
    company: "",
    model: "",
    year: "",
    price: "",
  });

  useEffect(() => {
    api.get("/vehicles").then((res) => {
      const v = res.data.find((x) => x.id == id);
      if (v) setVehicle(v);
    });
  }, [id]);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const update = () => {
    api.put(`/vehicles/${id}`, vehicle).then(() => {
      alert("Vehicle updated!");
      window.location.href = "/admin";
    });
  };

  return (
    <div>
      <h2>Update Vehicle</h2>

      <input name="company" value={vehicle.company} onChange={handleChange} /><br />
      <input name="model" value={vehicle.model} onChange={handleChange} /><br />
      <input name="year" value={vehicle.year} onChange={handleChange} /><br />
      <input name="price" value={vehicle.price} onChange={handleChange} /><br />

      <button onClick={update}>Update</button>
    </div>
  );
}

export default UpdateVehicle;
