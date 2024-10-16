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
        <Link to="/add-book" className="hover:underline">
          Add Book
        </Link>
        <Link to="/sign-in" className="hover:underline">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
