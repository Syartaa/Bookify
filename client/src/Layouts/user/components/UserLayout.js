import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Skeleton from "react-loading-skeleton"; // import skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // import styles

function UserLayout() {
  const [loading, setLoading] = useState(true);

  // Simulating data fetching or loading state for demonstration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // data is loaded, remove skeleton loader
    }, 1000); // Simulate loading for 2 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <NavBar />

      {/* Main content container */}
      <div className="bg-[#fdf5f0] flex-grow">
        {loading ? (
          // Show skeleton loader until page content is ready
          <div className="flex justify-center items-center h-screen">
            <Skeleton width={150} height={200} />
            <div className="ml-4">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={15} />
            </div>
          </div>
        ) : (
          // Show the actual content when not loading
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserLayout;
