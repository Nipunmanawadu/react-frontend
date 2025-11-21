import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../api/customerApi";
import "../styles/profile-edit.css";
import "../styles/Navbar.css"; // Make sure file name matches

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loggedUserId = localStorage.getItem("customerId");
  const customerName = localStorage.getItem("customerName");

  useEffect(() => {
    if (!loggedUserId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getCustomerById(loggedUserId);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [loggedUserId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  if (!user) return <p className="pe-loading">Loading profile...</p>;

  return (
    <>
      {/* Navbar */}
      <nav className="vehicle-navbar">
        <div className="navbar-left">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
        </div>
        <div className="navbar-right">
          {!customerName ? (
            <a href="/register" className="btn-signup">Sign Up</a>
          ) : (
            <>
              <span className="customer-name" onClick={handleProfileClick}>
                {customerName}
              </span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero background */}
      <div className="hero-bg">
        <div className="pe-container">
          <h2 className="pe-title">My Profile</h2>
          <div className="pe-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>

            <button
              className="pe-btn-edit"
              onClick={() => navigate(`/edit-profile/${user.id}`)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
