import React from "react";
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <h3 className="navbar-title">calendar-app</h3>
      <div className="navbar-right">
        <p className="navbar-project-name">WSD Projekti</p>
      </div>
    </header>
  );
};

export default Navbar;
