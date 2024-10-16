import React from "react";
import logo from "../images/image.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          style={{ width: "50px", height: "auto" }}
          className="mr-2"
        />
        <h1 className="text-xl">Book Haven</h1>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </Link>
        <Link
          to="/add-book"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Book
        </Link>
        <Link
          to="/sign-in"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
