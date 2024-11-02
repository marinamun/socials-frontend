import React, { useState } from "react";

const SinglePostDisplay = ({ post }) => {
  const userId = localStorage.getItem("userId");
  const [isVisible, setIsVisible] = useState(true); //for when deleting the post

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${post._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setIsVisible(false);
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!isVisible) return null;
  return (
    <div className="post" style={{ border: "1px solid black" }}>
      <h3>{post.userId.username}</h3> <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <div>Likes: {post.likes.length}</div>
      {userId === post.userId._id && (
        <button onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default SinglePostDisplay;
