import React from "react";
import { useNavigate } from "react-router-dom"; // <-- import
import "../styles/Home.css";
import "../styles/Footer.css";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar1";

const Home = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1950&q=80";

  const navigate = useNavigate(); // <-- hook

  const handleBrowseClick = () => {
    navigate("/view"); // <-- navigate to VehicleView
  };

  return (
    <div className="home-page">
      <Navbar1 />

      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <h1>Welcome to RapidCars</h1>
          <p>Find your perfect ride or list your vehicle for sale.</p>
          <button className="hero-button" onClick={handleBrowseClick}>
            Browse Vehicles
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature">
          <h2>Search with Ease</h2>
          <p>Browse thousands of vehicles from trusted sellers.</p>
        </div>
        <div className="feature">
          <h2>List Your Vehicle</h2>
          <p>Get your car seen by thousands of potential buyers.</p>
        </div>
        <div className="feature">
          <h2>Secure Transactions</h2>
          <p>Buy or sell confidently through our secure platform.</p>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
