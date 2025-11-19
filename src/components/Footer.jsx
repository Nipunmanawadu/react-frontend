import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>RapidCars</h3>
          <p>
            RapidCars is your trusted platform for buying and selling vehicles in Sri Lanka.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/vehicles">Vehicles</a></li>
            <li><a href="/add-vehicle">Add Vehicle</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: info@rapidcars.lk</p>
          <p>Phone: +94 77 123 4567</p>
          <p>Address: Colombo, Sri Lanka</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} RapidCars. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
