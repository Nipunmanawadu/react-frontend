import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar1 = () => {
  const navigate = useNavigate();
  const customerName = localStorage.getItem("customerName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="vehicle-navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="navbar-right">
        {!customerName ? (
          <Link to="/register" className="btn-signup">
            Sign Up
          </Link>
        ) : (
          <>
            <span className="customer-name" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              {customerName}
            </span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
