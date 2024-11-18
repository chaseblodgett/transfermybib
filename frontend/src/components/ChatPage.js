import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostForm from "./PostForm";
import PostReplies from "./PostReplies";

function ChatPage() {
  const { raceId } = useParams();
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState({});
  const [loading, setLoading] = useState(true);
  const [raceName, setRaceName] = useState("");
  const [showPostForm, setShowPostForm] = useState(false); 

  useEffect(() => {
    const fetchRaceName = async () => {
      try {
        const response = await fetch(`/races/${raceId}`);
        const data = await response.json();
        setRaceName(data.name || "Unknown Race");
      } catch (error) {
        console.error("Error fetching race name:", error);
        setRaceName("Unknown Race");
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/chat/${raceId}`);
        const data = await response.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceName();
    fetchPosts();
  }, [raceId]);

  // Fetch replies for each post
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const repliesData = await Promise.all(
          posts.map(async (post) => {
            const response = await fetch(`/replies/${post._id}`);
            const data = await response.json();
            return { postId: post._id, replies: data.slice(0, 2) }; // Only get the first 2 replies
          })
        );
        const repliesMap = repliesData.reduce((acc, { postId, replies }) => {
          acc[postId] = replies;
          return acc;
        }, {});
        setReplies(repliesMap);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    if (posts.length > 0) {
      fetchReplies();
    }
  }, [posts]);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setShowPostForm(false); // Hide the PostForm after a post is created
  };

  const refreshParentState = () => {
    setShowPostForm(false); // Hide the post form
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{raceName} Chat</h2>
      <Link to="/" style={styles.backLink}>
        &larr; Back to Home
      </Link>
      
      <div style={styles.postsContainer}>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <div style={styles.noPostsMessage}>No activity here yet!</div>
        ) : (
          posts.map((post) => (
            <Link 
              key={post._id} 
              to={`/chat/${raceId}/thread/${post._id}`}
              style={styles.postLink}
            >
              <div style={styles.postCard}>
                <strong style={styles.postType}>{post.type}</strong>
                <p style={styles.postMessage}>{post.message}</p>
                <span style={styles.postUser}>- {post.user}</span>
                <span style={styles.postTimestamp}>{new Date(post.createdAt).toLocaleString()}</span>
                {/* Display first two replies for each post */}
                <PostReplies replies={replies[post._id] || []} />
              </div>
            </Link>
          ))
        )}
      </div>

      {!showPostForm && ( // Only show the New Post button if the form isn't visible
        <button 
          style={styles.newPostButton} 
          onClick={() => setShowPostForm(true)} // Show the form when clicked
        >
          New Post
        </button>
      )}

      {showPostForm && ( // Display the PostForm when showPostForm is true
        <PostForm raceId={Number(raceId)} onNewPost={handleNewPost} onCancel={refreshParentState} />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
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
  newPostButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginBottom: "20px",
    width: "100%", // Span the full width of the container
    transition: "background-color 0.3s ease",
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
  postLink: {
    textDecoration: "none",
    color: "inherit",
  },
  postTimestamp: {
    fontSize: "0.8rem",
    color: "#888",
    marginLeft: "10px",
  },
};

export default ChatPage;
