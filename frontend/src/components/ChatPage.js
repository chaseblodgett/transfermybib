import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostForm from "./PostForm";

function ChatPage() {
  const { raceId } = useParams(); // Get the raceId from the URL
  const [posts, setPosts] = useState([]);  // Initially, set posts to an empty array
  const [loading, setLoading] = useState(true);  // Track loading state
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/chat/${raceId}`);
        const data = await response.json();
        console.log('Fetched data:', data);  // Log the fetched data
    
        if (Array.isArray(data)) {
          setPosts(data); 
        } else {
          console.error("Data is not an array:", data);
          setPosts([]);  // If data is not an array, set posts to an empty array
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);  // Set posts to empty array if error occurs
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();  
  }, [raceId]);  

  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost]); 
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{raceId} Marathon Chat</h2>
      <Link to="/" style={styles.backLink}>
        &larr; Back to Home
      </Link>
      <div style={styles.postsContainer}>
        {loading ? (
          <p>Loading posts...</p>  // Show loading message while fetching data
        ) : posts.length === 0 ? (
          <div style={styles.noPostsMessage}>No activity here yet!</div> // Show "No activity" message when there are no posts
        ) : (
          posts.map((post) => (
            <div key={post._id} style={styles.postCard}> 
              <strong style={styles.postType}>{post.type}</strong>
              <p style={styles.postMessage}>{post.message}</p>
              <span style={styles.postUser}>- {post.user}</span>
            </div>
          ))
        )}
      </div>
      <PostForm raceId={Number(raceId)} onNewPost={handleNewPost} />
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    lineHeight: 1.6,
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  backLink: {
    display: "block",
    textDecoration: "none",
    color: "#007bff",
    fontSize: "1rem",
    marginBottom: "30px",
    transition: "color 0.3s ease",
    textAlign: "center",
  },
  postsContainer: {
    marginTop: "20px",
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  postCard: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    transition: "box-shadow 0.3s ease",
  },
  postType: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333",
  },
  postMessage: {
    fontSize: "1rem",
    margin: "10px 0",
  },
  postUser: {
    fontSize: "0.9rem",
    color: "#666",
  },
  noPostsMessage: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ff9900",  
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",  
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
};

export default ChatPage;
