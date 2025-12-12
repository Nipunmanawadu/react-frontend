import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Standard Imports
import "../styles/App.css";
import "../styles/Dashboard.css";
import "../styles/Footer.css";

import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function MakeReservation() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [carModel, setCarModel] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [date, setDate] = useState("");

  const loggedInCustomerId = localStorage.getItem("customerId");

  // 1. Fetch Data
  useEffect(() => {
    if (loggedInCustomerId) {
      fetch(`http://localhost:8083/customer-app/customers/${loggedInCustomerId}`)
        .then((res) => res.json())
        .then((data) => setCustomerName(data?.name ?? "Guest"))
        .catch(() => setCustomerName("Guest"));
    }

    fetch(`http://localhost:8082/vehicle-service/vehicles/${carId}`)
      .then((res) => res.json())
      .then((data) => {
        setCarModel(data?.model ?? "Unknown Car");
        setPricePerDay(data?.price ?? 0);
        setBalance(data?.price ?? 0);
      })
      .catch(() => setCarModel("Unknown Car"));
  }, [carId, loggedInCustomerId]);

  // 2. Auto-Calculate Balance
  useEffect(() => {
    const advance = Number(advanceAmount);
    const newBalance = (pricePerDay ?? 0) - advance;
    setBalance(newBalance < 0 ? 0 : newBalance);
  }, [advanceAmount, pricePerDay]);

  // 3. Submit Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const advanceNum = Number(advanceAmount);

    if (advanceNum > (pricePerDay ?? 0)) {
      alert("Advance cannot be more than the Total Price!");
      return;
    }

    const reservationData = {
      customerId: loggedInCustomerId,
      carId: Number(carId),
      purchaseDate: date,
      advance: advanceNum,
      balance: balance,
      totalPrice: pricePerDay
    };

    fetch("http://localhost:8088/reservations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(() => {
        alert("Car Reserved Successfully!");
        navigate("/my-reservation");
      })
      .catch((err) => {
        console.error(err);
        alert("Error connecting to backend!");
      });
  };

  // --- COMPACT STYLES ---
  const pageContainer = {
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  };

  const invoiceCard = {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "700px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #dfe6e9",
    marginBottom: "40px",
    overflow: "hidden"
  };

  const header = {
    backgroundColor: "#2d3436",
    color: "#ffffff",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem"
  };

  const formBody = {
    padding: "30px"
  };

  // 2-Column Grid
  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px"
  };

  const label = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#636e72",
    textTransform: "uppercase",
    marginBottom: "6px",
    letterSpacing: "0.5px"
  };

  const inputBase = {
    width: "100%",
    height: "45px",
    padding: "0 12px",
    borderRadius: "4px",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center"
  };

  const readOnlyInput = {
    ...inputBase,
    backgroundColor: "#f1f2f6",
    border: "1px solid #ced6e0",
    color: "#2d3436"
  };

  const activeInput = {
    ...inputBase,
    backgroundColor: "#ffffff",
    border: "1px solid #b2bec3",
    color: "#2d3436",
    outline: "none",
    transition: "border-color 0.2s"
  };

  const balanceDisplay = {
    ...inputBase,
    backgroundColor: "#e3fafc",
    border: "1px solid #81ecec",
    color: "#00b894",
    fontWeight: "bold",
    fontSize: "1.1rem"
  };

  const btn = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#0984e3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    marginTop: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  return (
    <>
      <Navbar1 />

      <div style={pageContainer}>
        <div style={invoiceCard}>
          <div style={header}>
            <div style={{ fontWeight: "bold" }}>Sales Invoice</div>
            <div style={{ opacity: 0.7, fontSize: "0.85rem" }}>
              #{Date.now().toString().slice(-6)}
            </div>
          </div>

          <div style={formBody}>
            <form onSubmit={handleSubmit}>
              <div style={gridContainer}>
                
                {/* ROW 1 */}
                <div>
                  <label style={label}>Customer Name</label>
                  <input type="text" value={customerName} disabled style={readOnlyInput} />
                </div>

                <div>
                  <label style={label}>Vehicle Model</label>
                  <input type="text" value={carModel} disabled style={readOnlyInput} />
                </div>

                {/* ROW 2 */}
                <div>
                  <label style={label}>Total Price (Rs)</label>
                  <input
                    type="text"
                    value={(pricePerDay ?? 0).toLocaleString()}
                    disabled
                    style={{ ...readOnlyInput, fontWeight: "bold" }}
                  />
                </div>

                <div>
                  <label style={label}>Purchase Date</label>
                  <input
                    type="date"
                    required
                    onChange={(e) => setDate(e.target.value)}
                    style={activeInput}
                    onFocus={(e) => (e.target.style.borderColor = "#0984e3")}
                    onBlur={(e) => (e.target.style.borderColor = "#b2bec3")}
                  />
                </div>

                {/* ROW 3 */}
                <div>
                  <label style={label}>Advance Payment (Rs)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                    required
                    style={{ ...activeInput, borderColor: "#0984e3" }}
                  />
                </div>

                <div>
                  <label style={label}>Balance Due (Rs)</label>
                  <div style={balanceDisplay}>
                    {(balance ?? 0).toLocaleString()}
                  </div>
                </div>

              </div>

              <button
                type="submit"
                style={btn}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#74b9ff")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#0984e3")}
              >
                Confirm Purchase
              </button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default MakeReservation;
