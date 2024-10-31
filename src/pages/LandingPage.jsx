import React from "react";
import UserSearchBar from "../components/UserSearchBar";
import CreatePostPopup from "../components/CreatePostPopup";
import { useState, useEffect } from "react";
import AllPostsDisplay from "../components/AllPostsDisplay";

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/posts");
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

      fetchPosts();
    }, []);

    // Function to add a new post to the state
    const addNewPost = (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    };
  return (
    <>
      <h1>Landing page</h1>
      <UserSearchBar />
      <button onClick={() => setShowPopup(true)}>Create</button>
      {showPopup && (
        <CreatePostPopup
          onClose={() => setShowPopup(false)}
          addNewPost={addNewPost}
        />
      )}
      <AllPostsDisplay posts={posts} />
    </>
  );
};
export default LandingPage;
