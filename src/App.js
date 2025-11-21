import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import EditCustomer from "./pages/EditCustomer";  // Admin edit
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";    // Customer edit
import DashboardAdmin from "./pages/DashboardAdmin"; 
import VehicleManagement from "./pages/VehicleManagement";
import VehicleView from "./pages/VehicleView";
import Home from "./pages/Home";
import About from "./pages/Aboutus";

// Styles
import "./styles/vehicle.css";
import "./styles/customer.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Vehicle Management */}
        <Route path="/vehicles" element={<VehicleManagement />} />
        <Route path="/view" element={<VehicleView />} />

        {/* User Management */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />

        {/* Admin edit customer */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/edit/:id" element={<EditCustomer />} />

        {/* Customer profile & edit */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />

        {/* Optional redirect */}
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
