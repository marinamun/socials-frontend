import React, { useState, useEffect } from "react";

const SinglePostDisplay = ({ post }) => {
  const userId = localStorage.getItem("userId");
  const username = JSON.parse(localStorage.getItem("user")).username; //to display the owner of comment
  const [isVisible, setIsVisible] = useState(true); //for when deleting the post

  const [likes, setLikes] = useState(post.likes.length); // general like count
  const [isLiked, setIsLiked] = useState(post.likes.includes(userId)); // did the logged in user like it?

  const [comments, setComments] = useState([]); 
  const [commentText, setCommentText] = useState(""); 

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
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const response = await fetch(`http://localhost:5000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId,
          postId: post._id,
          content: commentText,
        }),
      });

      if (response.ok) {
        setCommentText(""); 
        const updatedComments = await fetch(
          `http://localhost:5000/api/comments/post/${post._id}`
        );
        const newComments = await updatedComments.json();
        setComments(newComments);
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/comments/post/${post._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data); 
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [post._id]);

  if (!isVisible) return null;
  return (
    <div className="post" style={{ border: "1px solid black" }}>
      <h3>{post.userId.username}</h3> <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <div>Likes: {post.likes.length}</div>
      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      <div>
        <h4>Comments</h4>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <strong>{comment.userId?.username}:</strong> {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Comment</button>
      {userId === post.userId._id && (
        <button onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default SinglePostDisplay;
