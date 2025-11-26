import { useState, useEffect } from 'react';
import "../styles/App.css";
import "../styles/Footer.css";
import Footer from "../components/Footer";


function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editDays, setEditDays] = useState(0);

  const loggedInCustomerId = 1;

  useEffect(() => {
    fetch(`http://localhost:8088/reservations/customer/${loggedInCustomerId}`)
      .then(res => { if(!res.ok) throw new Error(); return res.json(); })
      .then(data => setReservations(data))
      .catch(err => console.log("Backend not ready yet"));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Cancel this reservation?")) {
      fetch(`http://localhost:8088/reservations/delete/${id}`, { method: "DELETE" })
        .then(() => setReservations(reservations.filter(res => res.id !== id)));
    }
  };

  const handleSave = (id) => {
    const updatedData = { reservationDate: editDate, durationDays: editDays };
    fetch(`http://localhost:8088/reservations/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    }).then(() => {
      setReservations(reservations.map(res => res.id === id ? { ...res, ...updatedData } : res));
      setEditingId(null);
    });
  };

  const startEdit = (res) => {
    setEditingId(res.id);
    setEditDate(res.reservationDate);
    setEditDays(res.durationDays);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2>My Reservations</h2>
        
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Car ID</th>
              <th>Date</th>
              <th>Days</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map(res => (
                <tr key={res.id}>
                  <td>#{res.carId}</td>
                  
                  {/* Editable Date */}
                  <td>
                    {editingId === res.id ? 
                      <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} /> 
                      : res.reservationDate}
                  </td>

                  {/* Editable Days */}
                  <td>
                    {editingId === res.id ? 
                      <input type="number" value={editDays} onChange={e => setEditDays(e.target.value)} style={{width: "60px"}}/> 
                      : res.durationDays}
                  </td>

                  <td>${res.totalPrice}</td>

                  {/* Buttons */}
                  <td>
                    {editingId === res.id ? (
                      <button onClick={() => handleSave(res.id)} className="btn-save">Save</button>
                    ) : (
                      <button onClick={() => startEdit(res)} className="btn-edit">Edit</button>
                    )}
                    <button onClick={() => handleDelete(res.id)} className="btn-delete">Cancel</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign:"center", padding:"20px"}}>No reservations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default MyReservations;