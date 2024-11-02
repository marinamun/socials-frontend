import React, { useState } from "react";

const SinglePostDisplay = ({ post }) => {
  const userId = localStorage.getItem("userId");
  const [isVisible, setIsVisible] = useState(true); //for when deleting the post

  const [likes, setLikes] = useState(post.likes.length); // general like count
  const [isLiked, setIsLiked] = useState(post.likes.includes(userId)); // did the logged in user like it?

  //this is a like and dislike function
  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${post._id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
      } else {
        console.error("Failed to like/unlike post");
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

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
      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      {userId === post.userId._id && (
        <button onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default SinglePostDisplay;
