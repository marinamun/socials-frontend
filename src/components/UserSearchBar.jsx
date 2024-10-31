import React, { useState, useEffect } from "react";

const UserSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log("Frontend query:", query);
      if (query.length > 0) {
        fetchUsers();
      } else {
        setResults([]); // Clear results if input is empty
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

  return (
    <div>
      <input
        type="text"
        placeholder="Search users by username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <ul>
          {results.slice(0, 5).map(
            (
              user // Limit results to top 5
            ) => (
              <li key={user._id}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src={user.profilePicture || "/media/defaultPhoto.png"}
                    alt="Profile"
                    width="40"
                    height="40"
                  />

                  <h4>{user.username}</h4>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default UserSearchBar;
