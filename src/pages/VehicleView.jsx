// src/components/VehicleView.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { vehicleApi } from "../api/vehicleApi";
import "../styles/vehicle.css";
import "../styles/Footer.css";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar1";


function VehicleView() {
  const [vehicles, setVehicles] = useState([]);
  const [searchModel, setSearchModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const navigate = useNavigate(); // <-- Initialize navigate
  const customerName = localStorage.getItem("customerName");

  const fetchVehicles = async (model = "") => {
    setLoading(true);
    setError(null);

    try {
      const url =
        model.trim() !== ""
          ? `/vehicles?model=${encodeURIComponent(model.trim())}`
          : "/vehicles";

      const res = await vehicleApi.get(url);
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err.response || err);
      setError("Failed to load vehicles. Please check backend.");
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVehicles(searchModel);
  };

  const handleShowAll = () => {
    setSearchModel("");
    fetchVehicles();
  };

  const handleReserveClick = () => {
    if (!customerName) {
      // Not logged in → navigate to login
      navigate("/login");
    } else {
      // Logged in → navigate to reservation page (optional)
      navigate("/reserve"); // replace with your reservation route
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      <Navbar1 /> {/* <-- Navbar is now scoped & safe */}

      <div className="container">
        <h2>Search Available Vehicles</h2>

        <form onSubmit={handleSearch} style={{ marginBottom: 30 }}>
          <input
            type="text"
            placeholder="Enter model"
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
          />
          <button type="submit">Search</button>
          <button
            type="button"
            onClick={handleShowAll}
            style={{ backgroundColor: "#6c757d", marginLeft: "10px" }}
          >
            Show All
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="vehicle-grid">
          {vehicles.length === 0 && !loading && <p>No vehicles found.</p>}

          {vehicles.map((v) => (
            <div key={v.id} className="vehicle-card">
              <div className="card-image-wrapper">
                {v.photoUrl ? (
                  <img
                    src={v.photoUrl}
                    alt={`${v.company} ${v.model}`}
                    className="vehicle-photo-large"
                  />
                ) : (
                  <div className="placeholder-photo">No Photo</div>
                )}
              </div>

              <div className="card-details">
                <h3>
                  {v.company} {v.model}
                </h3>
                <p>Year: {v.year}</p>
                <p>${parseFloat(v.price).toLocaleString()}</p>

                <button
                  className="reserve-button"
                  onClick={handleReserveClick} // <-- Add this
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default VehicleView;
