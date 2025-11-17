import React from "react";
import VehicleList from "../components/VehicleList";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <Link to="/admin/add">
        <button>Add New Vehicle</button>
      </Link>

      <VehicleList isAdmin={true} />
    </div>
  );
}

export default AdminDashboard;
