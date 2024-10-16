import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import AddBook from "./Pages/AddBook";
import SignIn from "./pages/SignIn";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
