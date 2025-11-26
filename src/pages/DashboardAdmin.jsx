import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import "../styles/Dashboard.css";
import "../styles/Footer.css";
import Footer from "../components/Footer";

function DashboardAdmin() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar1 />

      <div className="admin-hero">
        <div className="admin-card">

          <h1 className="admin-title">Admin Dashboard</h1>

          <div className="admin-btn-group">
            <button
              className="admin-btn"
              onClick={() => navigate("/vehicles")}
            >
              Vehicle Management
            </button>

            <button
              className="admin-btn"
              onClick={() => navigate("/customerdashboard")}
            >
              Customer Management
            </button>

            <button
              className="admin-btn"
              onClick={() => navigate("/my-reservation")}
            >
              Reservation Management
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardAdmin;
