import React, { useState, useEffect } from "react";
import { vehicleApi } from "../api/vehicleApi"; // import the axios instance
import "./styles.css";

function VehicleView() {
  const [vehicles, setVehicles] = useState([]);
  const [searchModel, setSearchModel] = useState("");

  const fetchVehicles = async () => {
    try {
      const res = await vehicleApi.get("/");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchModel.trim() === "") {
        fetchVehicles();
      } else {
        const res = await vehicleApi.get(`?model=${searchModel}`);
        setVehicles(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container">
      <h2>View/Search Vehicles</h2>
      <form style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleView;
