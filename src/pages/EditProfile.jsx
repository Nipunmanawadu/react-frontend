import React, { useEffect, useState } from "react"; 
import { customerApi } from "../api/customerApi";
import { useParams, useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar1"; 
import Footer from "../components/Footer";   
import "../styles/EditProfile.css";

export default function EditUserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    customerApi.get(`/${id}`)
      .then(res => setForm({ ...res.data, password: "" }))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updateData = { ...form };
    if (!updateData.password) delete updateData.password;

    customerApi.put(`/${id}`, updateData)
      .then(() => {
        alert("Profile updated successfully!");
        navigate(`/profile`);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Navbar1 />

      <div className="ec-container">
        <div className="ec-card">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="ec-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="ec-input"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="ec-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (leave blank to keep current)"
              value={form.password}
              onChange={handleChange}
              className="ec-input"
            />
            <button type="submit" className="ec-btn">Update Profile</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
