import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import LearningPathsPage from "./pages/LearningPathsPage";
import About from "./pages/About";
import Enterprise from "./pages/Enterprise";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-950 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/learning-paths" element={<LearningPathsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/enterprise" element={<Enterprise />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
