import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

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
    </>
  );
};

export default Profile;
