import React, { useEffect, useState } from "react";
import { customerApi } from "../api/customerApi";
import { useNavigate } from "react-router-dom";
import "../styles/profile-edit.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("customer"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await customerApi.get(`/${loggedUser.id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [loggedUser.id]);

  if (!user) return <p className="pe-loading">Loading profile...</p>;

  return (
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
  );
}
