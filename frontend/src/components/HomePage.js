import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [races, setRaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch("/races");
        const data = await response.json();
        setRaces(data);
      } catch (error) {
        console.error("Error fetching races:", error);
      }
    };

    fetchRaces();
  }, []);

  const filteredRaces = races.filter((race) =>
    race.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRaces.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRaces = filteredRaces.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Transfer My Bib</h1>
        <img src="/favicon.png" alt="favicon" style={styles.favicon} />
      </div>
      <p style={styles.subtitle}>Buy or sell bibs for popular races</p>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a race..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <ul style={styles.raceList}>
        {currentRaces.map((race, index) => (
          <li
            key={race.raceId}
            style={{ ...styles.raceItem, animationDelay: `${index * 0.1}s` }} // Delay based on the index
          >
            <Link to={`/chat/${race.raceId}`} style={styles.raceLink}>
              {race.name}
            </Link>
            <div style={styles.location}>{race.location}</div>
          </li>
        ))}
      </ul>

      <div style={styles.paginationContainer}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>
        <span style={styles.pageNumber}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    color: "#b3b4bd",
    lineHeight: 1.6,
    backgroundColor: "#353839",
    fontFamily: "Courier New, monospace",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#A5CBC3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", // Space between text and image
    fontFamily: "Courier New, monospace",
  },
  header: {
    display: "flex", // Use flexbox for the header
    flexDirection: "row", // Arrange items side by side by default
    alignItems: "center", // Vertically center the items
    justifyContent: "center", // Center horizontally
    gap: "10px", // Space between text and image
    marginBottom: "20px", // Space below the header
  },
  favicon: {
    width: "50px",
    height: "50px"
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#A5CBC3",
    fontFamily: "Courier New, monospace",
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "1.1rem",
    borderRadius: "5px",
    border: "1px solid #A5CBC3",
    backgroundColor: "#353839",
    color: "#A5CBC3",
    marginBottom: "20px",
  },
  raceList: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  raceItem: {
    backgroundColor: "#A5CBC3",
    border: "1px solid #2C2E3a",
    borderRadius: "8px",
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    margin: "3px",
    opacity: 0, // Start with opacity 0 (hidden)
    animation: "fadeIn 0.5s forwards", // Apply animation
  },
  raceLink: {
    display: "block",
    textDecoration: "none",
    color: "#232b2b",
    fontSize: "1.2rem",
    fontWeight: "500",
    padding: "10px 15px",
    borderRadius: "8px",
    margin: "0px 0px 0px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  location: {
    fontSize: "1rem",
    color: "#232b2b",
    margin: "0px 0px 5px",
    fontStyle: "italic",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  paginationButton: {
    padding: "10px 15px",
    fontSize: "1rem",
    margin: "0 10px",
    border: "0px solid #0a21c0",
    borderRadius: "5px",
    cursor: "pointer",
    border: "1px solid #A5CBC3",
    backgroundColor: "#353839",
    color: "#A5CBC3",
    transition: "background-color 0.3s, color 0.3s",
  },
  pageNumber: {
    alignSelf: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#b3b4bd",
  },

  // Media Query for Small Screens
  '@media (max-width: 768px)': {
    title: {
      flexDirection: "column", // Stack title and image vertically
      gap: "0", // Remove space between text and image
    },
    favicon: {
      width: "24px", // Make image smaller on mobile
      height: "24px",
      marginTop: "10px", // Add margin on top to separate from title
    },
  },
};

const fadeIn = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

document.styleSheets[0].insertRule(fadeIn, document.styleSheets[0].cssRules.length);


export default HomePage;
