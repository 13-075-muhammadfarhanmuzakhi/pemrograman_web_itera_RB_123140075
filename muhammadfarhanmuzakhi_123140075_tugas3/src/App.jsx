import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";

// Komponen Header sederhana
const Header = () => (
  <nav
    style={{
      padding: "10px",
      backgroundColor: "#333",
      color: "white",
      display: "flex",
    }}
  >
    <Link
      to="/"
      style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
    >
      Beranda
    </Link>
    <Link to="/stats" style={{ color: "white", textDecoration: "none" }}>
      Statistik
    </Link>
  </nav>
);

function App() {
  return (
    <Router>
      <BookProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </BookProvider>
    </Router>
  );
}

export default App;
