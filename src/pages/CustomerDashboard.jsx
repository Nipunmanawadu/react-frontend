import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerApi } from "../api/customerApi";

import Popup from "../components/popup";
import "../styles/customer.css";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");   // NEW
  const [deleteId, setDeleteId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate();
  

  const loadCustomers = async () => {
    try {
      const res = await customerApi.get("");
      setCustomers(res.data);
    } catch (err) {
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // DELETE
  const deleteCustomer = async (id) => {
    setDeleteId(id);
    setPopupMessage("Are you sure you want to delete this customer?");
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await customerApi.delete(`/${deleteId}`);
      setDeleteId(null);
      setPopupMessage("Customer deleted successfully!");
      loadCustomers();

      setTimeout(() => {
        setPopupMessage(null);
      }, 10000);
    }
  };

  useEffect(() => {
    if (popupMessage && !deleteId) {
      const timer = setTimeout(() => {
        setPopupMessage(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage, deleteId]);

  // SEARCH BY ID
  const searchCustomerById = async () => {
    if (!searchId) return loadCustomers();
    try {
      const res = await customerApi.get(`/${searchId}`);
      setCustomers([res.data]);
    } catch (err) {
      alert("Customer not found");
      setCustomers([]);
    }
  };

  // ⭐ NEW: SEARCH BY NAME
  const searchCustomerByName = async () => {
    if (!searchName.trim()) return loadCustomers();
    try {
      const res = await customerApi.get(`/search?name=${searchName}`);
      setCustomers(res.data);
    } catch (err) {
      alert("No matching customers found");
      setCustomers([]);
    }
  };



  return (
    <>
    

      <div className="table-container">
        <h2>Customer Dashboard</h2>

        {/* ------------------ Search By ID ------------------ */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="number"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              marginRight: "10px",
              border: "none"
            }}
          />

          <button
            onClick={searchCustomerById}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Search ID
          </button>

          <button
            onClick={() => {
              setSearchId("");
              loadCustomers();
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#fff",
              color: "#000",
              marginLeft: "10px",
              cursor: "pointer"
            }}
          >
            Reset
          </button>
        </div>

        {/* ------------------ NEW: Search by Name ------------------ */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              marginRight: "10px",
              border: "none"
            }}
          />

          <button
            onClick={searchCustomerByName}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Search Name
          </button>

          <button
            onClick={() => {
              setSearchName("");
              loadCustomers();
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#fff",
              color: "#000",
              marginLeft: "10px",
              cursor: "pointer"
            }}
          >
            Reset
          </button>
        </div>

        {/* ------------------ TABLE ------------------ */}
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    className="action-btn edit"
                    onClick={() => navigate(`/edit/${c.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => deleteCustomer(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {popupMessage && (
        <Popup
          message={popupMessage}
          type="warning"
          onConfirm={deleteId ? confirmDelete : null}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </>
  );
}
