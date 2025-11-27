import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import EditCustomer from "./pages/EditCustomer";  
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";    
import DashboardAdmin from "./pages/DashboardAdmin"; 
import VehicleManagement from "./pages/VehicleManagement";
import VehicleView from "./pages/VehicleView";
import Home from "./pages/Home";
import About from "./pages/Aboutus";
import MakeReservation from './pages/MakeReservation';
import MyReservation from './pages/MyReservation';
import AdminReservations from "./pages/AdminReservations";

// Styles
import "./styles/vehicle.css";
import "./styles/customer.css";
import "./styles/App.css";//reservation css

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/vehicles" element={<VehicleManagement />} />
        <Route path="/view" element={<VehicleView />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />

        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/edit/:id" element={<EditCustomer />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />

        <Route path="/make-reservation/:carId" element={<MakeReservation />} />
        <Route path="/my-reservation" element={<MyReservation />} />
        <Route path="/admin-reservations" element={<AdminReservations />} />

        
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
