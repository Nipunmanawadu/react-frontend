import React from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";

export default function NavBar({ onLogout }) {
  return (
    <nav className="nav">
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}
