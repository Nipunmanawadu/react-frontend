import { useState, useEffect } from 'react';
import "../styles/App.css";
import "../styles/Footer.css";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8088/reservations`) // fetch all for admin
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.log("Error fetching reservations:", err));
  }, []);

  const startEdit = (res) => {
    setEditingId(res.id);
    setEditDate(res.purchaseDate);
  };

  const handleSave = (id) => {
    const updatedData = { purchaseDate: editDate };

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

  const handleDelete = (id) => {
    if (window.confirm("Delete this reservation?")) {
      fetch(`http://localhost:8088/reservations/delete/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error("Delete failed");
          setReservations(reservations.filter(reservation => reservation.id !== id));
        })
        .catch(err => console.log("Delete error:", err));
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="app-container">
        <div className="card">
          <h2>All Reservations</h2>
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Car ID</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Advance</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map(res => (
                  <tr key={res.id}>
                    <td>{res.customerId}</td>
                    <td>{res.carId}</td>
                    <td>
                      {editingId === res.id ?
                        <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} />
                        : res.purchaseDate
                      }
                    </td>
                    <td>Rs {res.totalPrice}</td>
                    <td>Rs {res.advance}</td>
                    <td>Rs {res.balance}</td>
                    <td>
                      {editingId === res.id ? (
                        <button onClick={() => handleSave(res.id)} className="btn-save">Save</button>
                      ) : (
                        <button onClick={() => startEdit(res)} className="btn-edit">Edit</button>
                      )}
                      <button onClick={() => handleDelete(res.id)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminReservations;
