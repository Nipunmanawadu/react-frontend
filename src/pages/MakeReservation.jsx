import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/App.css'

function MakeReservation() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [carModel, setCarModel] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState("");

  const loggedInCustomerId = 1; 

  useEffect(() => {
    // --- FETCH CUSTOMER (GitHub Ready Version) ---
    fetch(`http://localhost:8083/customer-app/customers/${loggedInCustomerId}`)
      .then(res => { if(!res.ok) throw new Error(); return res.json(); })
      .then(data => setCustomerName(data.name))
      .catch(() => setCustomerName("Loading...")); // Fallback

    // --- FETCH CAR (GitHub Ready Version) ---
    fetch(`http://localhost:8082/vehicle-service/vehicles/${carId}`)
      .then(res => { if(!res.ok) throw new Error(); return res.json(); })
      .then(data => { setCarModel(data.model); setPricePerDay(data.price); })
      .catch(() => setCarModel("Loading...")); // Fallback
  }, [carId]);

  useEffect(() => {
    setTotalPrice(pricePerDay * duration);
  }, [duration, pricePerDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      customerId: loggedInCustomerId,
      carId: Number(carId),
      reservationDate: date,
      durationDays: duration,
      totalPrice: totalPrice,
      status: "Confirmed"
    };

    fetch("http://localhost:8088/reservations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData)
    })
    .then(res => res.json())
    .then(() => {
      alert("Reservation Successful!");
      navigate("/my-reservation"); 
    })
    .catch(() => alert("Error connecting to Backend!"));
  };

  return (
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
            <label>Pick a Date</label>
            <input type="date" required onChange={e => setDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Number of Days</label>
            <input type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} />
          </div>

          <div className="total-price">
            Total: ${totalPrice}
          </div>

          <button type="submit" className="btn-primary">
            CONFIRM RESERVATION
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default MakeReservation;