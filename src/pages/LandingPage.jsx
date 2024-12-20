import React from "react";
import UserSearchBar from "../components/UserSearchBar";
import CreatePostPopup from "../components/CreatePostPopup";
import { useState, useEffect } from "react";
import AllPostsDisplay from "../components/AllPostsDisplay";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts`
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Only fetch posts if the user is logged in
    if (localStorage.getItem("token")) {
      fetchPosts();
    }
  }, []);

  // Function to add a new post to the state
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleCreatePostClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setShowPopup(true);
    }
  };
  return (
    <div style={{ marginTop: "80px", color: "#333" }}>
      <h1 style={{ color: "white" }}>Bee Social 🐝</h1>
      <UserSearchBar />
      <button onClick={handleCreatePostClick}>Create a post</button>
      {showPopup && (
        <CreatePostPopup
          onClose={() => setShowPopup(false)}
          addNewPost={addNewPost}
        />
      )}
      {localStorage.getItem("token") && <AllPostsDisplay posts={posts} />}
    </div>
  );
};
export default LandingPage;
