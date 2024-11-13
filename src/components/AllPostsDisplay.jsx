// AllPostsDisplay.jsx
import React from "react";
import SinglePostDisplay from "./SinglePostDisplay";
import { useState } from "react";
import "../style/AllPostsDisplay.css";

const AllPostsDisplay = ({ posts }) => {
  const [sortBy, setSortBy] = useState("recent");

  const sortPosts = (posts) => {
    if (sortBy === "popular") {
      return [...posts].sort((a, b) => b.likes.length - a.likes.length);
    } else if (sortBy === "recent") {
      return [...posts].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    }
    return posts;
  };

  return (
    <div className="all-posts-container">
      <div className="filter-options">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Recent</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {sortPosts(posts).map((post) => (
        <SinglePostDisplay key={post._id} post={post} />
      ))}
    </div>
  );
};

export default AllPostsDisplay;
