import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoo from "../../../image/logoo.png";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleLogoutMenu = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <header className="w-full bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
        <img
          src={logoo}
          alt="Logo"
          className="h-12 w-16 object-cover rounded-full shadow-lg"
        />
        <div
          className="text-2xl font-bold text-white tracking-wide"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          BOOKIFY
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-4">
        <a
          href="/home"
          className="text-base font-medium text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Home
        </a>
        <a
          href="/authors"
          className="text-base font-medium text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Authors
        </a>
        <a
          href="/titles"
          className="text-base font-medium text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Titles
        </a>
        <a
          href="/articles"
          className="text-base font-medium text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Articles
        </a>
        <a
          href="/contact"
          className="text-base font-medium text-white hover:text-orange-400 transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Contact Us
        </a>

        {/* User Icon with Logout Dropdown */}
        <div className="relative">
          <FaUserCircle
            className="text-3xl text-white hover:text-gray-300 cursor-pointer transition-colors"
            onClick={toggleLogoutMenu}
          />
          {showLogout && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-20 w-48">
              <button
                onClick={() => navigate("/favorites")}
                className="block px-4 py-2 text-base text-gray-800 hover:bg-gray-100 w-full text-left"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Favorite
              </button>
              <button
                onClick={() => navigate("/reservations")}
                className="block px-4 py-2 text-base text-gray-800 hover:bg-gray-100 w-full text-left"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                My Reservations
              </button>
              <button
                onClick={() => navigate("/loans")}
                className="block px-4 py-2 text-base text-gray-800 hover:bg-gray-100 w-full text-left"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Loans
              </button>
              <button
                onClick={() => navigate("/account")}
                className="block px-4 py-2 text-base text-gray-800 hover:bg-gray-100 w-full text-left"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Account Settings
              </button>
              <hr className="my-1 border-t border-gray-200" />
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-base text-red-600 hover:bg-red-100 w-full text-left"
                style={{ fontFamily: "Poppins, sans-serif" }}
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
