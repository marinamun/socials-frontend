import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use BrowserRouter directly
import "./App.css";
import SignUp from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Chat from "./components/Chat";
import UserSearchBar from "./components/UserSearchBar";


function App() {
  //for the chat
    const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Router>
        {" "}
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat currentUser={currentUser} />} />
          <Route path="/search" element={<UserSearchBar currentUser={currentUser} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
