import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/UserSearchBar.css";

const UserSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Retrieve user info from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 0) {
        fetchUsers();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/search?username=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token
          },
        }
      );

      if (response.ok) {
        const users = await response.json();
        setResults(users);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const startChat = (recipientId) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser && recipientId) {
      navigate("/chat", {
        state: { currentUserId: currentUser._id, recipientId },
      });
    } else {
      console.error("Missing current user or recipient data");
    }
  };

  return (
    <div className="user-search-container">
      <input
        type="text"
        placeholder="Search users by username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <ul>
          {results.slice(0, 5).map((user) => (
            <li key={user._id}>
              <img
                src={user.profilePicture || "/media/defaultPhoto.png"}
                alt="Profile"
                width="40"
                height="40"
              />
              <h4>{user.username}</h4>
              <button onClick={() => startChat(user._id)}>Text</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearchBar;
