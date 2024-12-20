import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import PostThread from './components/PostThread';
import WelcomePage from './components/WelcomePage';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat/:raceId" element={<ChatPage />} />
        <Route path="/chat/:raceId/thread/:postId" element={<PostThread />} />
      </Routes>
    </Router>
  );
}

export default App;

