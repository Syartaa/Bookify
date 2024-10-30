// Navbar.js
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoo from "../../../image/logoo.png"; 

function Navbar() {
  const [showLogout, setShowLogout] = useState(false); // Manage logout visibility
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleLogoutMenu = () => {
    setShowLogout((prev) => !prev); // Toggle logout menu visibility
  };

  return (
    <header className="w-full bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 shadow-md py-6 px-8 flex justify-between items-center sticky top-0 z-50">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-4">
        <img
          src={logoo}
          alt="Logo"
          className="h-14 w-14 object-cover rounded-full shadow-lg" 
        />
        <div className="text-3xl font-bold text-white tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
          BOOKIFY
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <a
          href="/home"
          className="text-2xl font-semibold text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Home
        </a>
        <a
          href="/authors"
          className="text-2xl  font-semibold text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Authors
        </a>
        <a
          href="/titles"
          className="text-2xl  font-semibold text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Titles
        </a>
        <a
          href="/articles"
          className="text-2xl font-semibold text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Articles
        </a>
        <a
          href="/contact"
          className="text-2xl  font-semibold text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Contact Us
        </a>

        {/* User Icon with Logout */}
        <div className="relative">
          <FaUserCircle
            className="text-4xl text-white hover:text-gray-300 cursor-pointer transition-colors"
            onClick={toggleLogoutMenu}
          />
          {showLogout && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-20">
              <button
                onClick={handleLogout}
                className="block px-6 py-3 text-lg text-gray-800 hover:bg-gray-100 w-full text-left"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
