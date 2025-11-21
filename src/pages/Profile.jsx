import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../api/customerApi";
import Navbar1 from "../components/Navbar1";  // ✅ Navbar1
import Footer from "../components/Footer";    // ✅ Footer
import "../styles/profile-edit.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loggedUserId = localStorage.getItem("customerId");
 

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

  if (!user) return <p className="pe-loading">Loading profile...</p>;

  return (
    <>
      {/* Navbar */}
      <Navbar1 />

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

      {/* Footer */}
      <Footer />
    </>
  );
}
