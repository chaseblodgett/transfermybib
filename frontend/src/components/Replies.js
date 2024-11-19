import React, { useState, useEffect } from "react";

function Replies({ postId }) {
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [user, setuser] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false); // Track form visibility

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
        setShowReplyForm(false); // Optionally hide the form after submitting
      } else {
        console.error("Error saving reply:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving reply:", error);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Format the date/time in a readable format
  };

  return (
    <div style={styles.repliesContainer}>
      {loadingReplies ? (
        <p>Loading replies...</p>
      ) : replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        replies.map((reply) => (
          <div key={reply._id} style={styles.replyCard}>
            <p style={styles.replyMessage}>{reply.message}</p>
            <div style={styles.replyMeta}>
              <span style={styles.replyUser}>{reply.user}</span>
              {reply.createdAt && (
                <span style={styles.replyTimestamp}>{formatDateTime(reply.createdAt)}</span>
              )}
            </div>
          </div>
        ))
      )}

      {!showReplyForm && (
        <button
          onClick={() => setShowReplyForm(true)}
          style={styles.replyButton}
        >
          New Reply
        </button>
      )}

      {showReplyForm && (
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
          <button
            type="button"
            onClick={() => setShowReplyForm(false)}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </form>
      )}
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
    fontFamily: "Georgia, serif"
  },
  replyButton: {
    marginBottom: "5px",
    backgroundColor: "#A5CBC3",
    color: "#353839",
    border: "none",
    padding: "5px 5px",
    borderRadius: "5px",
    cursor: "pointer",
    height: "100%"
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
  replyMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    color: "#555",
  },
  replyUser: {
    fontWeight: "bold",
  },
  replyTimestamp: {
    fontStyle: "italic",
    fontSize: "0.8rem",
    color: "#888",
    marginLeft: "10px",
  },
  replyForm: {
    margin: "20px 5px",
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
    backgroundColor: "#A5CBC3",
    color: "#353839",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    color: "#A5CBC3",
    backgroundColor: "#353839",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Replies;
