import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerApi } from "../api/customerApi";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import Popup from "../components/popup";
import "../styles/CustomerDashboard.css";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate();

  const loadCustomers = async () => {
    try {
      const res = await customerApi.get("");
      setCustomers(res.data);
    } catch {
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = (id) => {
    setDeleteId(id);
    setPopupMessage("Are you sure you want to delete this customer?");
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await customerApi.delete(`/${deleteId}`);
      setDeleteId(null);
      setPopupMessage("Customer deleted successfully!");
      loadCustomers();
      setTimeout(() => setPopupMessage(null), 10000);
    }
  };

  useEffect(() => {
    if (popupMessage && !deleteId) {
      const timer = setTimeout(() => setPopupMessage(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage, deleteId]);

  const searchCustomerById = async () => {
    if (!searchId) return loadCustomers();
    try {
      const res = await customerApi.get(`/${searchId}`);
      setCustomers([res.data]);
    } catch {
      alert("Customer not found");
      setCustomers([]);
    }
  };

  const searchCustomerByName = async () => {
    if (!searchName.trim()) return loadCustomers();
    try {
      const res = await customerApi.get(`/search?name=${searchName}`);
      setCustomers(res.data);
    } catch {
      alert("No matching customers found");
      setCustomers([]);
    }
  };

  return (
    <>
      <Navbar1 />

      <div className="dashboard-bg">
        <div className="dashboard-card">
          <h2>Customer Dashboard</h2>

          <div className="search-group">
            <input
              type="number"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="btn-search" onClick={searchCustomerById}>
              Search ID
            </button>
            <button
              className="btn-reset"
              onClick={() => {
                setSearchId("");
                loadCustomers();
              }}
            >
              Reset
            </button>
          </div>

          <div className="search-group">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button className="btn-search" onClick={searchCustomerByName}>
              Search Name
            </button>
            <button
              className="btn-reset"
              onClick={() => {
                setSearchName("");
                loadCustomers();
              }}
            >
              Reset
            </button>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/edit/${c.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
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
        </div>
      </div>

      {popupMessage && (
        <Popup
          message={popupMessage}
          type="warning"
          onConfirm={deleteId ? confirmDelete : null}
          onClose={() => setPopupMessage(null)}
        />
      )}

      <Footer />
    </>
  );
}
