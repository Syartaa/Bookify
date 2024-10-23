import React from 'react';
import { FaBook, FaRecycle, FaUsers, FaUserTie, FaListAlt } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen  p-6">
      <div className="container mx-auto">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">Bookify Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Books */}
          <div className="bg-white shadow-md p-6 rounded-lg border border-green-200 flex flex-col items-center">
            <FaBook className="text-green-600 text-5xl mb-4" />
            <p className="text-3xl font-bold mb-1">8</p>
            <p className="text-lg text-gray-500">Books Listed</p>
          </div>

          {/* Books Not Returned */}
          <div className="bg-white shadow-md p-6 rounded-lg border border-yellow-200 flex flex-col items-center">
            <FaRecycle className="text-yellow-600 text-5xl mb-4" />
            <p className="text-3xl font-bold mb-1">1</p>
            <p className="text-lg text-gray-500">Books Not Returned Yet</p>
          </div>

          {/* Registered Users */}
          <div className="bg-white shadow-md p-6 rounded-lg border border-red-200 flex flex-col items-center">
            <FaUsers className="text-red-600 text-5xl mb-4" />
            <p className="text-3xl font-bold mb-1">5</p>
            <p className="text-lg text-gray-500">Registered Users</p>
          </div>

          {/* Authors Listed */}
          <div className="bg-white shadow-md p-6 rounded-lg border border-green-200 flex flex-col items-center">
            <FaUserTie className="text-green-600 text-5xl mb-4" />
            <p className="text-3xl font-bold mb-1">11</p>
            <p className="text-lg text-gray-500">Authors Listed</p>
          </div>

          {/* Listed Categories */}
          <div className="bg-white shadow-md p-6 rounded-lg border border-blue-200 flex flex-col items-center">
            <FaListAlt className="text-blue-600 text-5xl mb-4" />
            <p className="text-3xl font-bold mb-1">5</p>
            <p className="text-lg text-gray-500">Listed Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}
