// CreatePostPopup.jsx
import React, { useState } from "react";
import "../style/CreatePostPopup.css";

const CreatePostPopup = ({ onClose, addNewPost }) => {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          content: content,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        console.log("New post created:", newPost);
        addNewPost(newPost); // Add the new post to the list
        onClose(); // Close the popup after posting
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <textarea
          placeholder="What's on your mind?"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onClose}>Close</button>
          <button onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
