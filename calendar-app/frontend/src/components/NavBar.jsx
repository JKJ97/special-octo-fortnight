import React from "react";
import '../styles/Navbar.css';

// Top navigation bar component
// Displays the app title and project name
const Navbar = () => {
  return (
    <header className="navbar-container">
      {/* App name on the left */}
      <h3 className="navbar-title">calendar-app</h3>

        {/* Project name on the right */}
      <div className="navbar-right">
        <p className="navbar-project-name">WSD Projekti</p>
      </div>
    </header>
  );
};

export default Navbar;
