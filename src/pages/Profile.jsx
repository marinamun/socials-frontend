import React, { useEffect, useState } from "react";
import EditInfoPopup from "../components/EditInfoPopup";
import "../style/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEdit = () => {
    setIsEditing(true); // Open the edit popup
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async (updatedUser) => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const savedUser = await response.json();
        setUser(savedUser);
        localStorage.setItem("user", JSON.stringify(savedUser)); // Update local storage
      } else {
        console.error("Failed to update profile in the database");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      const userData = JSON.parse(storedUser);
      console.log(
        "Profile picture URL in Profile component:",
        userData.profilePicture
      );
      setUser(userData);
    } else {
      console.log("No user data found. Please log in.");
    }
  }, []);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h2>Hello {user.username}👋🏻</h2>
      <img src={user.profilePicture} alt="Profile" />
      <p> {user.bio}</p>
      <button onClick={handleOpenEdit}>Edit Info</button>

      {isEditing && (
        <EditInfoPopup
          user={user}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Profile;
