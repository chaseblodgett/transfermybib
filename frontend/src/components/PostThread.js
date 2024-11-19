import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Replies from "./Replies";

function PostThread() {
  const { raceId, postId } = useParams();  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/chat/${raceId}/thread/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, raceId]);

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading post...</p>
      ) : post ? (
        <>
          <h2 style={styles.title}>{post.post.type}</h2>
          <p style={styles.message}>{post.post.message}</p>
          <span style={styles.user}>- {post.post.user}</span>
          <Replies postId={post.post._id} /> {/* Display replies */}
          
          {/* Correct Backlink with raceId */}
          <Link to={`/chat/${raceId}`} style={styles.backLink}>
            &larr; Back to Chat
          </Link>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    // fontFamily: "'Arial', sans-serif",
    // color: "#A5CBC3",
    lineHeight: 1.6,
    
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#A5CBC3"
  },
  message: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#D2E5E1"
  },
  user: {
    fontSize: "1rem",
    color: "#94B6AF",
  },
  backLink: {
    display: "block",
    textDecoration: "none",
    color: "#A5CBC3",
    fontSize: "1rem",
    marginTop: "20px",
    transition: "color 0.3s ease",
  },
};

export default PostThread;
