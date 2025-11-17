import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginCustomer from "./components/LoginCustomer";
import RegisterCustomer from "./components/RegisterCustomer";
import AdminDashboard from "./components/AdminDashboard";

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

export default App;
