import React, { useState } from "react";
import api from "../api/api";

function SearchVehicle() {
  const [model, setModel] = useState("");
  const [result, setResult] = useState([]);

  const search = () => {
    api.get("/vehicles", { params: { model } }).then((res) => setResult(res.data));
  };

  return (
    <div>
      <h3>Search by Model</h3>
      <input placeholder="Model" onChange={(e) => setModel(e.target.value)} />
      <button onClick={search}>Search</button>

      {result.length > 0 && (
        <ul>
          {result.map((v) => (
            <li key={v.id}>{v.company} {v.model} - {v.year}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchVehicle;
