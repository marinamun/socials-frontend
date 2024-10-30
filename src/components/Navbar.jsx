import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove the token from local storage (the one added in Login)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User signed out successfully.");
    navigate("/login");
  };

  return (
    <div>
      <Link to="/">Homepage</Link>
      <button onClick={handleSignOut}>Sign out</button>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Log in</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Navbar;
