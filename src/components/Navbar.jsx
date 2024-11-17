import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if user is logged in by checking for a token in localStorage
  const isLoggedIn = localStorage.getItem("token");

  //for chat
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSignOut = () => {
    // Remove the token from local storage (the one added in Login)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User signed out successfully.");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <Link to="/">Homepage</Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <>
            <button onClick={handleSignOut}>Sign out</button>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
