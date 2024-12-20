import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        navigate("/");

        // Store the JWT token in local storage so we can use it for signout
        localStorage.setItem("token", result.token);
        //store the user's info so while they are logged we can display that info in profile
        localStorage.setItem("user", JSON.stringify(result.user));
        //to get the id directly for the post creation
        localStorage.setItem("userId", result.user._id);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Welcome back :)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          
        />
      </div>
      <div>
        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
