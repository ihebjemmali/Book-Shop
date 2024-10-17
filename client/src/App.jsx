import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/UserComponent/Login";
import Register from "./components/UserComponent/Register";
import Home from "./Pages/Home";
import BookDetails from "./components/BookDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />{" "}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
