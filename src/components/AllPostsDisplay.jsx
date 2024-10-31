// AllPostsDisplay.jsx
import React from "react";

const AllPostsDisplay = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.userId.username}</h3>{" "}
          {/* Adjust based on your data structure */}
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post" />}
          <div>Likes: {post.likes.length}</div>
        </div>
      ))}
    </div>
  );
};

export default AllPostsDisplay;
