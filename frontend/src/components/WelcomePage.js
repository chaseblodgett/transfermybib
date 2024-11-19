import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [secondMessageComplete, setSecondMessageComplete] = useState(false);

  const messages = useMemo(
    () => ["I want to sell my bib", "I want to buy a bib", "Transfer My Bib"],
    []
  );

  const typingSpeed = 80;
  const deletingSpeed = 50;
  const delayBetweenMessages = 800;

  useEffect(() => {
    if (isTypingComplete) return;

    const fullMessage = messages[loopIndex % messages.length];
    let baseText = "";
    if(loopIndex == 0){
        baseText = "I want";
    }
    else if(loopIndex == 1){
        baseText = "";
    }
    else{
        baseText = "Transfer My Bib";
    }

    const isTyping = !isDeleting;

    const timeout = setTimeout(() => {
      if (isTyping) {
        // Typing logic
        setTypedText((prev) => fullMessage.slice(0, prev.length + 1));
        if (typedText === fullMessage) {
          setTimeout(() => setIsDeleting(true), delayBetweenMessages);
        }
      } else {
        // Deleting logic
        setTypedText((prev) =>
          prev.length > baseText.length ? prev.slice(0, prev.length - 1) : prev
        );
        if (typedText === baseText) {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }
      }
      if(loopIndex === messages.length - 2 && typedText === ""){
        setSecondMessageComplete(true);
      }
      else if (loopIndex === messages.length - 1 && typedText === baseText) {
        setIsTypingComplete(true);
      }
    }, isTyping ? typingSpeed : deletingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, loopIndex, messages, isTypingComplete]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#353839",
      fontFamily: "Courier New, monospace !important",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      margin: "0 0 20px",
      color: "#A5CBC3",
      fontFamily: "Courier New, monospace",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#A5CBC3",
      backgroundColor: "#353839",
      border: "1px solid #A5CBC3",
      borderRadius: "5px",
      cursor: "pointer",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
      fontFamily: "Courier New, monospace",
    },
    buttonHover: {
      // backgroundColor: "#8AA9A3",
    },
    arrow: {
      marginLeft: "10px",
      display: "inline-block",
    },
    typingProgress: {
      fontSize: "1rem",
      color: "#666",
    },
    cursor: {
        display: "inline-block",
        width: "2px",
        height: "1em",
        backgroundColor: "#A5CBC3",
        animation: "blink 1s step-end infinite",
        marginLeft: "2px",
      },
    favicon: {
        width: "32px", 
        height: "32px",
    },
      
  };
  
  return (
    <div style={styles.container}>
      <h1 
        style={styles.heading}>{typedText}
        {!isTypingComplete && <span style={styles.cursor}></span>}
        {isTypingComplete && <img src="/favicon.png" alt="favicon" style={styles.favicon}/>}
      </h1>
      {secondMessageComplete && (
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={() => navigate("/home")}
        >
          Get Started <span style={styles.arrow}>→</span>
        </button>
      )}
    </div>
  );
}

export default WelcomePage;
