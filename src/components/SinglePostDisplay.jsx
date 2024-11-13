import React, { useState, useEffect } from "react";
import "../style/SinglePostDisplay.css";

const SinglePostDisplay = ({ post }) => {
  const userId = localStorage.getItem("userId");
  const user = JSON.parse(localStorage.getItem("user")).username; //to display the owner of comment
  const [isVisible, setIsVisible] = useState(true); //for when deleting the post

  const [likes, setLikes] = useState(post.likes.length); // general like count
  const [isLiked, setIsLiked] = useState(post.likes.includes(userId)); // did the logged in user like it?

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  //for replys to the comments
  const [replyText, setReplyText] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  //for comment expansion

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
        setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
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

  const handleReplyToComment = async (commentId) => {
    if (!replyText[commentId]?.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/${commentId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId,
            content: replyText[commentId],
          }),
        }
      );

      if (response.ok) {
        const updatedComments = await fetch(
          `http://localhost:5000/api/comments/post/${post._id}`
        );
        const newComments = await updatedComments.json();
        setComments(newComments);
        setReplyText({ ...replyText, [commentId]: "" });
      } else {
        console.error("Failed to add reply");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
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

  console.log("Post data:", post);
  console.log("post.userId:", post.userId);
  console.log("Profile Picture URL:", post.userId?.profilePicture);
  console.log("Username:", post.userId?.username);
  return (
    <div className="post">
      <div className="post-header">
        {post.userId ? (
          <>
            {console.log("Rendering user data:", post.userId)}

            <img
              src={post.userId.profilePicture || "/media/defaultPhoto.png"}
              alt="User"
              width="50"
              height="50"
              className="profile-picture"
              style={{ borderRadius: "50%" }}
            />
            <h3>{post.userId.username}</h3>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>{" "}
      <div className="post-content">
        <p>{post.content}</p>

        {post.image && (
          <img src={post.image} alt="Post" className="post-uploaded-img" />
        )}
      </div>
      <div
        className="post-like"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
        <div>Likes: {likes}</div>
      </div>
      <div className="post-comments">
        <h4>Comments</h4>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <div className="main-comment">
                  <strong>{comment.userId?.username}:</strong> {comment.content}
                </div>
                <ul>
                  {comment.replies &&
                    (expandedComments[comment._id]
                      ? comment.replies.map((reply) => (
                          <li key={reply._id}>
                            <strong>{reply.userId?.username}:</strong>{" "}
                            {reply.content}
                          </li>
                        ))
                      : comment.replies.slice(0, 1).map((reply) => (
                          <li key={reply._id}>
                            <strong>{reply.userId?.username}:</strong>{" "}
                            {reply.content}
                          </li>
                        )))}
                </ul>
                {comment.replies.length >= 0 && (
                  <div
                    className={`reply-toggle ${
                      expandedComments[comment._id] ? "expanded" : ""
                    }`}
                    onClick={() => toggleReplies(comment._id)}
                  >
                    <span className="triangle">
                      {expandedComments[comment._id] ? "▼" : "▶"}
                    </span>
                    {expandedComments[comment._id] ? "Show Less" : "Show More"}
                    <br />
                  </div>
                )}
                {expandedComments[comment._id] && (
                  <div className="comment-input">
                    <input
                      type="text"
                      value={replyText[comment._id] || ""}
                      onChange={(e) =>
                        setReplyText({
                          ...replyText,
                          [comment._id]: e.target.value,
                        })
                      }
                      placeholder="Reply to this comment..."
                    />
                    <button onClick={() => handleReplyToComment(comment._id)}>
                      Reply
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <div className="comment-input">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>
      {userId === post.userId._id && (
        <button onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default SinglePostDisplay;
