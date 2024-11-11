import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
      bio,
      profilePicture: "../media/defaultPhoto.png",
    };

    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const savedUser = await response.json();
      console.log("User registered:", savedUser);
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error("Error registering user:", errorData);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Nice to meet you :)</h2>
      <div>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
