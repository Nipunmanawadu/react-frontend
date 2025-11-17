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
      </Routes>
    </BrowserRouter>
  );
}
function App() {
  return (
    <Router>
      <nav style={{ padding: 20, background: "#eee" }}>
        <Link to="/" style={{ marginRight: 20 }}>Customer</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddVehicle />} />
        <Route path="/admin/update/:id" element={<UpdateVehicle />} />
      </Routes>
    </Router>
      );
}


export default App;
