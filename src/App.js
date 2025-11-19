import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditCustomer from "./pages/EditCustomer";

import VehicleManagement from "./pages/VehicleManagement";
import VehicleView from "./pages/VehicleView";

import "./styles/vehicle.css";
import "./styles/customer.css";
import Home from "./pages/Home";
import About from "./pages/Aboutus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set VehicleView as default page */}
        <Route path="/" element={<Home />} />
        <Route path="/" element={<VehicleView />} />

        {/* User Management System */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditCustomer />} />

        {/* Vehicle Management System */}
        <Route path="/vehicles" element={<VehicleManagement />} />
        <Route path="/view" element={<VehicleView />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        

        {/* Optional redirect */}
        <Route path="/home" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
