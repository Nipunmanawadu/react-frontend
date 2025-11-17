import React, { useEffect, useState } from "react";
import { vehicleApi } from "../api/api";

function VehicleList({ isAdmin }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    vehicleApi.get("/vehicles").then((res) => setVehicles(res.data));
  }, []);

  const deleteVehicle = async (id) => {
    await vehicleApi.delete(`/vehicles/${id}`);
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <div>
      <h2>Vehicles</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th><th>Company</th><th>Model</th><th>Year</th><th>Price</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td><td>{v.company}</td><td>{v.model}</td><td>{v.year}</td><td>{v.price}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => window.location.href=`/admin/update/${v.id}`}>Edit</button>
                  <button onClick={() => deleteVehicle(v.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList;
