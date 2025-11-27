import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

import "../styles/App.css";
import "../styles/Dashboard.css";
import "../styles/Footer.css";

function MakeReservation() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [carModel, setCarModel] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0); 
  const [customerName, setCustomerName] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [date, setDate] = useState("");
  const loggedInCustomerId = localStorage.getItem("customerId");

  useEffect(() => {
   
    fetch(`http://localhost:8083/customer-app/customers/${loggedInCustomerId}`)
      .then(res => res.json())
      .then(data => setCustomerName(data.name))
      .catch(() => setCustomerName("Loading..."));

    
    fetch(`http://localhost:8082/vehicle-service/vehicles/${carId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Vehicle data:", data);
        setCarModel(data.model);
        setPricePerDay(data.price);
        setBalance(data.price); 
      })
      .catch(() => setCarModel("Loading..."));
  }, [carId, loggedInCustomerId]);

 
  useEffect(() => {
    setBalance(pricePerDay - advanceAmount);
  }, [advanceAmount, pricePerDay]);

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationData = {
      customerId: loggedInCustomerId,
      carId: Number(carId),
      purchaseDate: date,
      advance: advanceAmount,  
      balance: balance,       
      totalPrice: pricePerDay
    };

    fetch("http://localhost:8088/reservations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(() => {
        alert("Reservation Successful!");
        navigate("/my-reservation");
      })
      .catch((err) => {
        console.error(err);
        alert("Error connecting to backend!");
      });
  };

  return (
    <>
      <Navbar1 />

      <div className="app-container">
        <div className="card">
          <h2>Complete Your Booking</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Customer Name</label>
              <input type="text" value={customerName} disabled />
            </div>

            <div className="form-group">
              <label>Selected Car</label>
              <input type="text" value={carModel} disabled />
            </div>

            <div className="form-group">
              <label>Purchase Date</label>
              <input
                type="date"
                required
                onChange={e => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Advance Amount</label>
              <input
                type="number"
                min="5000"
                value={advanceAmount}
                onChange={e => setAdvanceAmount(Number(e.target.value))}
              />
            </div>

            <div className="total-price">
              Balance Amount : Rs {balance}
            </div>

            <button type="submit" className="btn-primary">
              CONFIRM RESERVATION
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MakeReservation;
