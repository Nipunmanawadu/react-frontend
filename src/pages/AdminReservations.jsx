import { useState, useEffect } from 'react';
// Standard Imports
import "../styles/App.css"; 
import "../styles/Footer.css";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editAdvance, setEditAdvance] = useState(0);

  // 1. Fetch Data
  useEffect(() => {
    fetch("http://localhost:8088/reservations")
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.log("Error fetching reservations:", err));
  }, []);

  // 2. Start Edit
  const startEdit = (res) => {
    setEditingId(res.id);
    setEditAdvance(res.advance ?? 0); 
  };

  // 3. Save
  const handleSave = (id, originalTotalPrice) => {
    const newAdvance = Number(editAdvance);
    const totalPrice = originalTotalPrice ?? 0;

    if (newAdvance > totalPrice) {
      alert("Error: Advance cannot exceed Total Price.");
      return;
    }

    const newBalance = totalPrice - newAdvance;
    const updatedData = { advance: newAdvance, balance: newBalance };

    fetch(`http://localhost:8088/reservations/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        setReservations(reservations.map(reservation =>
          reservation.id === id ? { ...reservation, ...updatedData } : reservation
        ));
        setEditingId(null);
      })
      .catch(err => console.log("Update error:", err));
  };

  // 4. Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      fetch(`http://localhost:8088/reservations/delete/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error("Delete failed");
          setReservations(reservations.filter(reservation => reservation.id !== id));
        })
        .catch(err => console.log("Delete error:", err));
    }
  };

  // --- COMPACT & PROFESSIONAL STYLES ---
  const pageContainer = {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "30px 20px",
    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif"
  };

  const dashboardCard = {
    backgroundColor: "#ffffff",
    maxWidth: "1100px",
    margin: "0 auto",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0"
  };

  const header = {
    padding: "20px 25px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff"
  };

  const tableWrapper = { overflowX: "auto" };
  const table = { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" };

  const th = {
    backgroundColor: "#334155",
    color: "#ffffff",
    padding: "12px 18px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  const td = {
    padding: "10px 18px",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    verticalAlign: "middle"
  };

  const inputEdit = {
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #3b82f6",
    width: "90px",
    fontSize: "0.9rem",
    outline: "none",
    fontWeight: "bold",
    color: "#1e293b"
  };

  // Helper: Status Badges
  const getBadge = (balance) => {
    const bal = balance ?? 0;
    const isPaid = bal <= 0;

    return (
      <span style={{
        backgroundColor: isPaid ? "#ccfbf1" : "#ffe4e6",
        color: isPaid ? "#0f766e" : "#be123c",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "0.7rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        display: "inline-block",
        minWidth: "60px",
        textAlign: "center"
      }}>
        {isPaid ? "Paid" : "Due"}
      </span>
    );
  };

  // Helper: Action Buttons
  const btn = (type) => {
    const isEdit = type === "edit";
    const isSave = type === "save";

    let bg = isEdit ? "#eff6ff" : isSave ? "#f0fdf4" : "#fef2f2";
    let color = isEdit ? "#2563eb" : isSave ? "#16a34a" : "#dc2626";
    let border = isEdit ? "#bfdbfe" : isSave ? "#bbf7d0" : "#fecaca";

    return {
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "0.8rem",
      fontWeight: "600",
      cursor: "pointer",
      border: `1px solid ${border}`,
      backgroundColor: bg,
      color: color,
      marginRight: "6px",
      transition: "all 0.2s"
    };
  };

  return (
    <>
      <Navbar1 />
      <div style={pageContainer}>
        
        <div style={dashboardCard}>
          <div style={header}>
            <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>
              Reservation Admin
            </div>
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Total: <strong>{reservations.length}</strong> records
            </div>
          </div>

          <div style={tableWrapper}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Customer</th>
                  <th style={th}>Vehicle</th>
                  <th style={th}>Date</th>
                  <th style={th}>Status</th>
                  <th style={th}>Total</th>
                  <th style={th}>Advance</th>
                  <th style={th}>Balance</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>

                {reservations.length > 0 ? (
                  reservations.map(res => (
                    <tr 
                      key={res.id}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                    >
                      <td style={td}>
                        <span style={{ fontWeight: "600", color: "#0f172a" }}>
                          #{res.customerId ?? "N/A"}
                        </span>
                      </td>

                      <td style={td}>#{res.carId ?? "N/A"}</td>
                      <td style={td}>{res.purchaseDate ?? "N/A"}</td>
                      
                      <td style={td}>{getBadge(res.balance)}</td>

                      <td style={{ ...td, fontWeight: "600" }}>
                        Rs {(res.totalPrice ?? 0).toLocaleString()}
                      </td>

                      <td style={td}>
                        {editingId === res.id ? (
                          <input 
                            type="number"
                            value={editAdvance}
                            onChange={e => setEditAdvance(e.target.value)}
                            style={inputEdit}
                            autoFocus
                          />
                        ) : (
                          <span>Rs {(res.advance ?? 0).toLocaleString()}</span>
                        )}
                      </td>

                      <td style={{
                        ...td,
                        color: (res.balance ?? 0) > 0 ? "#be123c" : "#0f766e",
                        fontWeight: "700"
                      }}>
                        Rs {(res.balance ?? 0).toLocaleString()}
                      </td>

                      <td style={td}>
                        {editingId === res.id ? (
                          <button 
                            onClick={() => handleSave(res.id, res.totalPrice)}
                            style={btn("save")}
                          >
                            Save
                          </button>
                        ) : (
                          <button 
                            onClick={() => startEdit(res)}
                            style={btn("edit")}
                          >
                            Edit
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(res.id)}
                          style={btn("delete")}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                      No data available.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminReservations;
