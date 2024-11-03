import React, { useEffect, useState } from "react";
import EditInfoPopup from "../components/EditInfoPopup";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEdit = () => {
    setIsEditing(true); // Open the edit popup
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
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
    <>
      <h2>Hello {user.username}</h2>
      <p>Your bio: {user.bio}</p>
      <img src={user.profilePicture} alt="Profile" />
      <button onClick={handleOpenEdit}>Edit Info</button>

      {isEditing && (
        <EditInfoPopup
          user={user}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default Profile;
