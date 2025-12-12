import { useState, useEffect } from 'react';
import "../styles/App.css";
import "../styles/Footer.css";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function MyReservations() {

  const [reservations, setReservations] = useState([]);
  const loggedInCustomerId = localStorage.getItem("customerId");

  useEffect(() => {
    fetch(`http://localhost:8088/reservations/customer/${loggedInCustomerId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setReservations(data))
      .catch(err => console.log("Backend not ready or error:", err));
  }, [loggedInCustomerId]);

  return (
    <>
      <Navbar1 />

      <div className="app-container">
        <div className="card">
          <h2>My Reservations</h2>

          <table className="reservation-table">
            <thead>
              <tr>
                <th>Car ID</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Advance</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {reservations.length > 0 ? (
                reservations.map(res => (
                  <tr key={res.id}>
                    <td>#{res.carId}</td>
                    <td>{res.purchaseDate}</td>
                    <td>Rs {res.totalPrice}</td>
                    <td>Rs {res.advanceAmount ?? res.advance ?? 0}</td>
                    <td>Rs {res.balanceAmount ?? res.balance ?? res.totalPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
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

export default MyReservations;
