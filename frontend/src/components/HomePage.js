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
      <h1 style={styles.title}>TRANSFER MY BIB</h1>
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

      {}
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
    fontFamily: "'Courier New', sans-serif",
    color: "#b3b4bd", 
    lineHeight: 1.6,
    backgroundColor: "#ede8f5", 
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#153075", // Bright blue color for titles
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#2453cc", // Subtle light gray
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #b3b4bd", // Dark border
    backgroundColor: "#ADBBDA", // Darker input background
    fontFamily: "'Courier New', sans-serif",
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
    backgroundColor: "#3d52a0", // Darker background for list items
    border: "1px solid #2C2E3a", // Subtle border
    borderRadius: "8px",
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add depth
    margin: "5px"
  },
  raceLink: {
    display: "block",
    textDecoration: "none",
    color: "#FFFFFF", // Bright blue for links
    fontSize: "1.2rem",
    fontWeight: "500",
    padding: "10px 15px",
    borderRadius: "8px",
    margin: "0px 0px 0px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    backgroundColor: "transparent", // Transparent by default
    '&:hover': {
      backgroundColor: '#0a21c0', // Bright blue background on hover
      color: '#fff', // White text on hover
    },
  },
  location: {
    fontSize: "1rem",
    color: "#cbd2e5", // Light gray for location text
    margin: "0px 20px 10px",
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
    border: "1px solid #0a21c0", // Bright blue border
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#eaeaec", // Dark background for buttons
    color: "#0a21c0", // Bright blue text
    transition: "background-color 0.3s, color 0.3s",
    '&:hover': {
      backgroundColor: '#0a21c0', // Bright blue background on hover
      color: '#141619', // Dark text on hover
    },
  },
  pageNumber: {
    alignSelf: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#b3b4bd", // Light text for page number
  },

  
};


export default HomePage;
