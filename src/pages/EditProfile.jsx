import React, { useEffect, useState } from "react"; 
import { customerApi } from "../api/customerApi";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/profile-edit.css";

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
    <div className="pe-container">
      <h2 className="pe-title">Edit Profile</h2>
      <form className="pre-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text"
          name="name"
          className="pre-input"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          className="pre-input"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          className="pre-input"
          value={form.phone}
          onChange={handleChange}
        />

        <label>Password (leave blank to keep current)</label>
        <input
          type="password"
          name="password"
          className="pre-input"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="pe-btn-update">Update Profile</button>
      </form>
    </div>
  );
}
