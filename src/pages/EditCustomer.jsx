import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customerApi } from "../api/customerApi";
import Navbar1 from "../components/Navbar1";     // ✅ Navbar
import Footer from "../components/Footer";       // ✅ Footer
import "../styles/EditCustomer.css";             // Separate CSS

export default function EditCustomer() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const res = await customerApi.get(`/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("Failed to load customer");
      }
    };
    loadCustomer();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await customerApi.put(`/${id}`, form);

      setPopup("Customer Updated Successfully!");

      setTimeout(() => {
        setPopup(false);
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar1 />

      {/* Edit Customer Container */}
      <div className="ec-container">
        <div className="ec-card">
          <h2>Edit Customer</h2>

          <form onSubmit={handleUpdate}>
            <input
              className="ec-input"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Name"
              required
            />

            <input
              className="ec-input"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <input
              className="ec-input"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              required
            />

            <button className="ec-btn" type="submit">
              Update
            </button>
          </form>
        </div>

        {/* Popup Message */}
        {popup && <div className="ec-popup">{popup}</div>}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
