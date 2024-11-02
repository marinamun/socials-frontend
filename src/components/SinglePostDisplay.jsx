// SinglePostDisplay.jsx
import React from "react";

const SinglePostDisplay = ({ post }) => {
  return (
    <div className="post" style={{ border: "1px solid black" }}>
      <h3>{post.userId.username}</h3>{" "}
      {/* Adjust based on your data structure */}
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <div>Likes: {post.likes.length}</div>
    </div>
  );
};

export default SinglePostDisplay;
