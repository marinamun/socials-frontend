// AllPostsDisplay.jsx
import React from "react";
import SinglePostDisplay from "./SinglePostDisplay";


const AllPostsDisplay = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <SinglePostDisplay key={post._id} post={post} />
      ))}
    </div>
  );
};

export default AllPostsDisplay;
