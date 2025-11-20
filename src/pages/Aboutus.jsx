import React from "react";
import "../styles/About.css";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import "../styles/Footer.css";

const About = () => {
  return (
    <div className="about-page">
      <Navbar1 />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <h1>About RapidCars</h1>
          <p>
            Rapid Cars is Sri Lanka's premier online marketplace for buying and
            selling vehicles. Simple, safe, and transparent vehicle trading
            experience.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <div className="about-intro">
        <p>
          Whether you're looking for your next car or want to list your own,
          Rapid Cars makes the process seamless, trustworthy, and efficient.
        </p>
      </div>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <div className="mission-cards">
          <div className="mission-card">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/handshake.png"
              alt="Trust"
            />
            <h3>Trusted Sellers</h3>
            <p>All vehicles are verified for authenticity and quality.</p>
          </div>
          <div className="mission-card">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/lock.png"
              alt="Security"
            />
            <h3>Secure Transactions</h3>
            <p>Buy and sell vehicles safely with verified users.</p>
          </div>
          <div className="mission-card">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/customer-support.png"
              alt="Support"
            />
            <h3>24/7 Support</h3>
            <p>We provide help whenever you need it.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="John Doe"
            />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Smith"
            />
            <h3>Jane Smith</h3>
            <p>CTO</p>
          </div>
          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/men/76.jpg"
              alt="Alex Brown"
            />
            <h3>Alex Brown</h3>
            <p>Marketing Head</p>
          </div>
          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Sara Lee"
            />
            <h3>Sara Lee</h3>
            <p>Product Manager</p>
          </div>
        </div>
      </section>
       <Footer />
    </div>
  );
};

export default About;
