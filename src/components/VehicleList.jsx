import React, { useEffect, useState } from "react";
import api from "../api/api";

function VehicleList({ isAdmin }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get("/vehicles").then((res) => setVehicles(res.data));
  }, []);

  return (
    <div>
      <h2>Vehicles</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            {isAdmin && <th>Actions</th>}
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

              {isAdmin && (
                <td>
                  <button onClick={() => window.location.href = `/admin/update/${v.id}`}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      api.delete(`/vehicles/${v.id}`).then(() => window.location.reload());
                    }}
                  >
                    Delete
                  </button>
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
