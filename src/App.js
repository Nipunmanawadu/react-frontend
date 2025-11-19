import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditCustomer from "./pages/EditCustomer";

import VehicleManagement from "./pages/VehicleManagement";
import VehicleView from "./pages/VehicleView";
import "./styles/vehicle.css";
import "./styles/customer.css";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation for vehicle pages only */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/vehicles" style={{ marginRight: "10px" }}>
          Manage Vehicles
        </Link>
        <Link to="/view">Search Vehicles</Link>
      </nav>

      <Routes>
        {/* User Management System */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditCustomer />} />

        {/* Vehicle Management System */}
        <Route path="/vehicles" element={<VehicleManagement />} />
        <Route path="/view" element={<VehicleView />} />

        {/* Optional redirect (if you want /home to go somewhere) */}
        <Route path="/home" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
