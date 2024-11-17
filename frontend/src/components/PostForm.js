import React, { useState } from "react";

function PostForm({ raceId, onNewPost }) {
  const [type, setType] = useState("Selling");
  const [message, setMessage] = useState("");
  const [name, setName] = useState(""); // New state for user name
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(""); // To track any errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use the entered name, or "Anonymous" if no name is entered
    const newPost = {
      raceId: raceId,
      type,
      message,
      user: name || "Anonymous", // Default to "Anonymous" if no name is provided
    };

    // Set loading state
    setIsLoading(true);
    setError(""); // Reset error message before each attempt

    try {
      // Send a POST request to the server
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

      // On success, notify the parent component
      const savedPost = await response.json();
      onNewPost(savedPost);

      // Clear form fields after submitting
      setMessage("");
      setName(""); 
    } catch (err) {
      setError("Error creating post. Please try again later.");
      console.error(err); // Log error for debugging
    } finally {
      setIsLoading(false); // Stop loading after request finishes
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
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
      {error && <p style={styles.error}>{error}</p>} {/* Show error message if any */}
      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? "Posting..." : "Post"} {/* Show loading state */}
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
    backgroundColor: "#f9f9f9",
    maxWidth: "600px",
    margin: "20px auto",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
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
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
