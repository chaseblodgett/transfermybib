import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// // Import the favicon if it’s in the src folder
// import favicon from './path-to-your-favicon/favicon.ico';

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
        if (Array.isArray(data)) {
          setRaces(data);  
        } else {
          console.error("Fetched data is not an array:", data);
        }
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
      {/* Updated Title Section */}
      <h1 style={styles.title}>
        TRANSFER MY BIB
        <img src="/favicon.png" alt="favicon" style={styles.favicon} />
      </h1>
      <p style={styles.subtitle}>Find or transfer bibs for popular races</p>
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
        {currentRaces.map((race) => (
          <li key={race.raceId} style={styles.raceItem}>
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
    backgroundColor: "#ede8f5", 
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#153075",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", // Space between text and image
  },
  favicon: {
    width: "32px", // Adjust the size as needed
    height: "32px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#2453cc",
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #b3b4bd", 
    backgroundColor: "#ADBBDA", 
    color: "#050c1d", 
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
    backgroundColor: "#3d52a0",
    border: "1px solid #2C2E3a",
    borderRadius: "8px",
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    margin: "3px",
  },
  raceLink: {
    display: "block",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: "1.2rem",
    fontWeight: "500",
    padding: "10px 15px",
    borderRadius: "8px",
    margin: "0px 0px 0px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  location: {
    fontSize: "1rem",
    color: "#cbd2e5",
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
    border: "1px solid #0a21c0",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#eaeaec",
    color: "#0a21c0",
    transition: "background-color 0.3s, color 0.3s",
  },
  pageNumber: {
    alignSelf: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#b3b4bd",
  },
};

export default HomePage;
