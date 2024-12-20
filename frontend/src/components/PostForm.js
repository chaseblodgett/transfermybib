import React, { useState } from "react";

function PostForm({ raceId, onNewPost, onCancel }) {
  const [type, setType] = useState("Selling");
  const [message, setMessage] = useState("");
  const [name, setName] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      raceId: raceId,
      type,
      message,
      user: name || "Anonymous", 
    };

    setIsLoading(true);
    setError(""); 

    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const savedPost = await response.json();
      onNewPost(savedPost);

      setMessage("");
      setName(""); 
    } catch (err) {
      setError("Error creating post. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={styles.textarea}
          />
        </label>
      </div>
      
      <div style={styles.formGroupRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Type:
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={styles.select}
            >
              <option value="Selling">Selling</option>
              <option value="Buying">Buying</option>
            </select>
          </label>
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>} {/* Show error message if any */}
      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? "Posting..." : "Post"} {/* Show loading state */}
      </button>

      <button 
        type="button" 
        style={styles.cancelButton} 
        onClick={onCancel} // Call the cancel function passed from the parent
      >
        Cancel
      </button>
    </form>
  );
}

const styles = {
  form: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#D5D5D5",
    maxWidth: "600px",
    margin: "20px auto",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  formGroupRow: {
    display: "flex",
    justifyContent: "space-around",  
    gap: "5px",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "calc(100% - 10px)",  // Adjust width to allow space for padding
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "5px",
  },
  
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "none",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    fontSize: "1.2rem",
    backgroundColor: "#A5CBC3",
    color: "#353839",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    fontSize: "1.2rem",
    color: "#A5CBC3",
    backgroundColor: "#353839", // Red background
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px", // Add margin for spacing
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "red",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default PostForm;
