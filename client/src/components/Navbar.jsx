import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-book-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link
          to="/home"
          className="text-2xl font-serif font-bold text-book-accent hover:text-white transition-colors duration-300"
        >
          BookMarket
        </Link>
        <div className="flex items-center space-x-4">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/add-book">Add Book</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/" className="btn-secondary">
            Sign In
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`text-white hover:text-book-accent font-semibold transition-colors duration-300 ${className}`}
  >
    {children}
  </Link>
);

export default Navbar;
