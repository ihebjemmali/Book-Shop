import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/UserComponent/Login";
import Register from "./components/UserComponent/Register";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import BookDetails from "./components/BookDetails";
import AddBook from "./Pages/AddBook";
import UpdateBook from "./Pages/UpdateBook";
import DeleteBook from "./Pages/DeleteBook";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home addToCart={addToCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
        <Route path="/delete-book/:id" element={<DeleteBook />} />
      </Routes>
    </Router>
  );
};

export default App;
