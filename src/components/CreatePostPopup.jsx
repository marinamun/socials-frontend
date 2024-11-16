import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../style/CreatePostPopup.css";

const CreatePostPopup = ({ onClose, addNewPost }) => {
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

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
      uploadedImage,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const createdPost = await response.json();

        // Immediately close the popup
        onClose();

        // Fetch the populated post data after closing the popup
        const populatedResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/${createdPost._id}`
        );
        if (populatedResponse.ok) {
          const populatedPost = await populatedResponse.json();
          addNewPost(populatedPost);
        } else {
          console.error("Failed to fetch populated post data");
        }
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
        <div style={{ display: "flex", justifyContent: "center", marginTop:"20px" }}>
          <button onClick={onClose}>Close</button>
          <button onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
