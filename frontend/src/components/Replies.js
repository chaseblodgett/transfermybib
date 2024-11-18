import React, { useState, useEffect } from "react";

function Replies({ postId }) {
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [user, setuser] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const response = await fetch(`/replies/${postId}`);
      const data = await response.json();
      setReplies(data || []);
    } catch (error) {
      console.error(`Error fetching replies for post ${postId}:`, error);
      setReplies([]);
    } finally {
      setLoadingReplies(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [postId]);

  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!user || !replyMessage) {
      alert("Please fill out both fields.");
      return;
    }

    const newReply = {
      postId,
      user,
      message: replyMessage,
    };

    try {
      const response = await fetch(`/replies/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReply),
      });

      if (response.ok) {
        const savedReply = await response.json();
        setReplies((prevReplies) => [...prevReplies, savedReply]);
        setuser("");
        setReplyMessage("");
      } else {
        console.error("Error saving reply:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving reply:", error);
    }
  };

  return (
    <div style={styles.repliesContainer}>
      <button style={styles.replyButton} onClick={fetchReplies}>
        Refresh Replies
      </button>
      {loadingReplies ? (
        <p>Loading replies...</p>
      ) : replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        replies.map((reply) => (
          <div key={reply._id} style={styles.replyCard}>
            <p style={styles.replyMessage}>{reply.message}</p>
            <span style={styles.replyUser}>- {reply.user}</span>
          </div>
        ))
      )}
      <form onSubmit={handleAddReply} style={styles.replyForm}>
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setuser(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Write a reply..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.submitButton}>
          Add Reply
        </button>
      </form>
    </div>
  );
}

const styles = {
  repliesContainer: {
    marginTop: "10px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  replyButton: {
    marginBottom: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  replyCard: {
    backgroundColor: "#e9ecef",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
  },
  replyMessage: {
    margin: "0 0 5px",
  },
  replyUser: {
    fontSize: "0.9rem",
    color: "#555",
  },
  replyForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },
  submitButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Replies;
