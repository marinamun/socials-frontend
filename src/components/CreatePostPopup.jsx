// CreatePostPopup.jsx
import React, { useState } from "react";
import "../style/CreatePostPopup.css";

const CreatePostPopup = ({ onClose, addNewPost }) => {
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedImage(reader.result.split(",")[1]);
    };
  };

  const handlePost = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const postData = {
      userId,
      content,
      uploadedImage, // Send the base64 string of the image - cloudinary requires it
    };

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const newPost = await response.json();
        console.log("New post created:", newPost);
        addNewPost(newPost);
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
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onClose}>Close</button>
          <button onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
