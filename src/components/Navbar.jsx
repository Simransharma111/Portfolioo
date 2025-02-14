import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    // Fetch data from JSON in public folder
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setNavData(data.navbar))
      .catch((error) => console.error("Error loading navbar data:", error));
  }, []);

  if (!navData) return <p className="loading">Loading Navbar...</p>;

  return (
    <nav className="navbar">
      <div className="logo">{navData.logo}</div>

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {navData.links.map((link, index) => (
          <li key={index}>
            <a href={link.href} onClick={() => setIsOpen(false)}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
