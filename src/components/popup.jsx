import React from "react";
import "../styles/customer.css";

export default function Popup({ message, type = "warning", onClose, onConfirm }) {
  return (
    <div className="popup-overlay">
      <div className={`popup ${type}`}>
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
          {onConfirm && (
            <button className="popup-btn confirm" onClick={onConfirm}>Yes</button>
          )}
          <button className="popup-btn close" onClick={onClose}>{onConfirm ? "No" : "×"}</button>
        </div>
      </div>
    </div>
  );
}
