import React, { useEffect, useState } from "react";
import { customerApi } from "../api/customerApi";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const loadCustomers = async () => {
    try {
     const res = await customerApi.get(""); // fetch all customers
      setCustomers(res.data);
    } catch (err) {
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    if (window.confirm("Delete this customer?")) {
      await customerApi.delete(`/${id}`);
      loadCustomers();
    }
  };

  const logout = () => {
    localStorage.removeItem("customer");
    navigate("/");
  };

  return (
    <>
      <NavBar onLogout={logout} />
      <div className="table-container">
        <h2>Customer Dashboard</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${c.id}`)}>Edit</button>
                  <button onClick={() => deleteCustomer(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
