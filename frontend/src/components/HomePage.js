import React, { useState } from "react";
import { Link } from "react-router-dom";

// Expanded list of races (add more races for demonstration)
const races = [
  { id: 1, name: "TCS New York City Marathon + Dash to the Finish Line 5K", location: "New York City, NY" },
  { id: 2, name: "Bank of America Chicago Marathon + 5K", location: "Chicago, IL" },
  { id: 3, name: "Walt Disney World Marathon Weekend", location: "Lake Buena Vista, FL" },
  { id: 4, name: "AJC Peachtree Road Race", location: "Atlanta, GA" },
  { id: 5, name: "Boston Marathon + BAA 5K", location: "Boston, MA" },
  { id: 6, name: "Bolder Boulder", location: "Boulder, CO" },
  { id: 7, name: "Flying Pig Marathon Weekend", location: "Cincinnati, OH" },
  { id: 8, name: "Philadelphia Marathon, Half Marathon, and Rothman Institute 8K", location: "Philadelphia, PA" },
  { id: 9, name: "Blue Cross Broad Street Run", location: "Philadelphia, PA" },
  { id: 10, name: "Disney Princess Half Marathon", location: "Orlando, FL" },
  { id: 11, name: "Hot Chocolate Run – Chicago", location: "Chicago, IL" },
  { id: 12, name: "Lilac Bloomsday Run", location: "Spokane, WA" },
  { id: 13, name: "Wine & Dine Half Marathon Weekend", location: "Orlando, FL" },
  { id: 14, name: "RBC Brooklyn Half Marathon", location: "Brooklyn, NY" },
  { id: 15, name: "United Airlines NYC Half", location: "New York, NY" },
  { id: 16, name: "Honolulu Marathon", location: "Honolulu, HI" },
  { id: 17, name: "Pittsburgh Marathon", location: "Pittsburgh, PA" },
  { id: 18, name: "Chevron Houston Marathon / Aramco Half Marathon / ABB 5K", location: "Houston, TX" },
  { id: 19, name: "Credit Union Cherry Blossom Ten Mile", location: "Washington, DC" },
  { id: 20, name: "Cooper River Bridge Run", location: "Charleston, SC" },
  
];

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRaces = races.filter((race) =>
    race.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total pages
  const totalPages = Math.ceil(filteredRaces.length / itemsPerPage);

  // Get the races to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRaces = filteredRaces.slice(startIndex, startIndex + itemsPerPage);

  // Handle page changes
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
      <h1 style={styles.title}>Bib Transfer Portal</h1>
      <p style={styles.subtitle}>Find or transfer bibs for popular races below:</p>
      
      {/* Search input */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a marathon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      
      <ul style={styles.raceList}>
        {currentRaces.map((race) => (
          <li key={race.id} style={styles.raceItem}>
            <Link to={`/chat/${race.id}`} style={styles.raceLink}>
              {race.name}
            </Link>
            {/* Displaying the location */}
            <div style={styles.location}>{race.location}</div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
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
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    lineHeight: 1.6,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#666",
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
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
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "8px",
    transition: "box-shadow 0.3s ease",
  },
  raceLink: {
    display: "block",
    textDecoration: "none",
    color: "#007bff",
    fontSize: "1.2rem",
    fontWeight: "500",
    padding: "10px 15px",
    borderRadius: "8px",
    margin: "0px 0px 0px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  location: {
    fontSize: "1rem",
    color: "#666",
    margin: "0px 20px 10px", 
    fontStyle: "italic",
  },
  raceItemHover: {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  raceLinkHover: {
    backgroundColor: "#007bff",
    color: "#fff",
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
    border: "1px solid #007bff",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#007bff",
    transition: "background-color 0.3s, color 0.3s",
  },
  pageNumber: {
    alignSelf: "center",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};


export default HomePage;
