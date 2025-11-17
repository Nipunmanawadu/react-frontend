import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginCustomer from "./components/LoginCustomer";
import RegisterCustomer from "./components/RegisterCustomer";
import AdminDashboard from "./components/AdminDashboard";

import AdminDashboard from "./pages/AdminDashboard";
import AddVehicle from "./pages/AddVehicle";
import UpdateVehicle from "./pages/UpdateVehicle";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterCustomer />} />
        <Route path="/login" element={<LoginCustomer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        <Route path="/admin/add" element={<AddVehicle />} />
        <Route path="/admin/update/:id" element={<UpdateVehicle />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
