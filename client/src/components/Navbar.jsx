// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Book Haven</h1>
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
