// Navbar.js
import React from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-800">BOOKIFY</div>
        <nav className="space-x-8 flex items-center">
          <a href="/home" className="text-gray-700 hover:text-pink-500">Home</a>
          <a href="/aboutus" className="text-gray-700 hover:text-pink-500">About us</a>
          <a href="/author" className="text-gray-700 hover:text-pink-500">Author</a>
          <a href="/articles" className="text-gray-700 hover:text-pink-500">Articles</a>
          <a href="/contact" className="text-gray-700 hover:text-pink-500">Contact Us</a>
          <FaUserCircle className="text-3xl text-gray-700 hover:text-pink-500" />
        </nav>
      </header>
  );
}

export default Navbar;
