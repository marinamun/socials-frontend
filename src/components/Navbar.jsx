import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";

const Navbar = () => {
  const navigate = useNavigate();

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

  return (
    <div>
      <Link to="/">Homepage</Link>
      {isLoggedIn ? (
        <>
          <button onClick={handleSignOut}>Sign out</button>
          <Link to="/profile">Profile</Link>
          <Notification currentUserId={currentUser._id} />

        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
