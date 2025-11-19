import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">Car Management</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
