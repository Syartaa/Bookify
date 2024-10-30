import React, { useState } from "react"; // Import useState
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoo from "../../../image/logoo.jpg"; 

function Navbar() {
  const [showLogout, setShowLogout] = useState(false); // State to manage logout menu visibility
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Implement logout logic if necessary
    navigate("/login");
  };

  const toggleLogoutMenu = () => {
    setShowLogout((prev) => !prev); // Toggle the visibility of the logout menu
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logoo} alt="Logo" className="h-10 mr-2" />
        <div className="text-3xl font-bold text-gray-800">BOOKIFY</div>
      </div>
      <nav className="space-x-8 flex items-center relative"> {/* Add relative positioning */}
        <a href="/home" className="text-gray-700 hover:text-pink-500">Home</a>
        <a href="/authors" className="text-gray-700 hover:text-pink-500">Authors</a>
        <a href="/titles" className="text-gray-700 hover:text-pink-500">Titles</a>
        <a href="/articles" className="text-gray-700 hover:text-pink-500">Articles</a>
        <a href="/contact" className="text-gray-700 hover:text-pink-500">Contact Us</a>
        
        {/* User icon that shows the logout option */}
        <div className="relative inline-block">
          <FaUserCircle 
            className="text-3xl text-gray-700 hover:text-pink-500 cursor-pointer"
            onClick={toggleLogoutMenu} 
          />
          {showLogout && ( // Conditionally render logout option
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
              <button 
                onClick={handleLogout} 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
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
