import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>
        <div>
          <Link to="/add-book" className="mr-4">
            Add Book
          </Link>
          <Link to="/sign-in" className="mr-4">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
