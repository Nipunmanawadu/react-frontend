import React from "react";
import "../styles/About.css";
import Navbar1 from "../components/Navbar1"; // adjust the path if needed

const About = () => {
  return (
    <div>
      <Navbar1 />  {/* <-- Add this line to use Navbar1 */}
      <div className="about-page">
        <h1>About Carpola</h1>
        <p>
          Carpola is Sri Lanka’s premier online marketplace for buying and selling vehicles. Whether you’re looking for your next car or want to list your own, Carpola makes the process simple, safe, and transparent.
        </p>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            To connect buyers and sellers across Sri Lanka, offering a seamless experience backed by trust and reliability.
          </p>
        </section>

        <section className="team">
          <h2>Meet the Team</h2>
          <p>
            We are a passionate group of automotive enthusiasts and tech professionals dedicated to making vehicle trading accessible for everyone.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
