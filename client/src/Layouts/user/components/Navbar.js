import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoo from "../../../image/logoo.jpg"; 

function Navbar() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logoo} alt="Logo" className="h-10 mr-2" /> {/* Adjust height as needed */}
        <div className="text-3xl font-bold text-gray-800">BOOKIFY</div>
      </div>
      <nav className="space-x-8 flex items-center">
        <a href="/home" className="text-gray-700 hover:text-pink-500">Home</a>
        <a href="/authors" className="text-gray-700 hover:text-pink-500">Authors</a>
        <a href="/titles" className="text-gray-700 hover:text-pink-500">Titles</a>
        <a href="/articles" className="text-gray-700 hover:text-pink-500">Articles</a>
        <a href="/contact" className="text-gray-700 hover:text-pink-500">Contact Us</a>
        <a onClick={handleLogout} className="text-gray-700 hover:text-pink-500 cursor-pointer">Log Out</a>
        <FaUserCircle className="text-3xl text-gray-700 hover:text-pink-500" />
      </nav>
    </header>
  );
}

export default Navbar;
