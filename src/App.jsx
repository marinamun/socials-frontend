import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use BrowserRouter directly
import "./App.css";
import SignUp from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
