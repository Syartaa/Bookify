import React from "react";
import {
  HiChartPie,
  HiDocumentText,
} from "react-icons/hi"; // Import necessary icons
import { SiGoogledocs } from "react-icons/si";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../../../image/2.png"; // Import the logo image
import Cookies from "js-cookie"; // Import Cookies package
import { Link } from "react-router-dom"; // Import Link component

function DashboardSidebar() {
  const signout = () => {
    // Remove user and token cookies
    Cookies.remove("user");
    Cookies.remove("token");

    // Redirect to the sign-in page
    window.location.href = "/signup"; // Update with the correct sign-in path
  };

  return (
    <div className="flex ">
      <aside className="top-0 left-0 z-40 w-34 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="h-full px-3 py-4 ">
          <ul className="space-y-2 font-medium">
            <li className="flex flex-row gap-4 items-center">
              <img src={logo} className="w-20 py-2" alt="logo" />
            </li>
            <li>
              <Link
                to="/dashboard" // Use Link to navigate
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiChartPie className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <>
              <li>
                <Link
                  to="/book" // Use Link to navigate
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Books</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/author" // Use Link to navigate
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Author</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/reservation" // Use Link to navigate
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Reservation</span>
                </Link>

              </li>
              <li>
                <Link
                  to="/review" // Use Link to navigate
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Reviews</span>
                </Link>

              </li>
              <li>
                <Link
                  to="/fine" // Use Link to navigate
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Fine</span>
                </Link>

              </li>
              <li>
                <Link
                  to="/loan" // Use Link to navigate
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Loan</span>
                </Link>

              </li>
              <li>
                <Link
                  to="/category" // Use Link to navigate
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <SiGoogledocs className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Category</span>
                </Link>
              </li>
              <li>
                <span
                  onClick={signout} // Sign out function on click
                  className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaSignOutAlt className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                </span>
              </li>
            </>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default DashboardSidebar;
