import React from 'react';

const Replies = ({ replies }) => {
  return (
    <div style={styles.repliesContainer}>
      {replies.length > 0 ? (
        replies.map((reply, index) => (
          <div key={index} style={styles.replyCard}>
            <p style={styles.replyMessage}>{reply.message}</p>
            <span style={styles.replyUser}>- {reply.user}</span>
          </div>
        ))
      ) : (
        <p style={styles.noReplies}>No replies yet.</p>
      )}
    </div>
  );
};

const styles = {
  repliesContainer: {
    marginTop: '10px',
    paddingLeft: '20px',
  },
  replyCard: {
    backgroundColor: '#f1f1f1',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '5px',
  },
  replyMessage: {
    fontSize: '0.9rem',
    margin: '5px 0',
  },
  replyUser: {
    fontSize: '0.8rem',
    color: '#666',
  },
  noReplies: {
    fontSize: '0.9rem',
    color: '#888',
  },
};

export default Replies;
