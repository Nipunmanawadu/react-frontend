import React from "react";


const Navbar1 = () => {
  return (
    <nav className="vehicle-navbar">
     <div className="navbar-left">
        <a href="/">Home</a>
        <a href="/About">About Us</a>
      </div>
       <div className="navbar-right">
        <a href="/login" className="btn-login">Login</a>
        <a href="/Register" className="btn-signup">Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar1;
