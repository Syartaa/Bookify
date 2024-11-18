import React from 'react';

const CustomAlert = ({ message, type = 'info', onClose }) => {
  const alertTypes = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div
      className={`p-4 mb-4 border-l-4 rounded-lg shadow-md ${alertTypes[type]} flex items-center justify-between`}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {/* Add icon based on type */}
          {type === 'info' && <span className="text-2xl">ℹ️</span>}
          {type === 'success' && <span className="text-2xl">✔️</span>}
          {type === 'warning' && <span className="text-2xl">⚠️</span>}
          {type === 'error' && <span className="text-2xl">❌</span>}
        </div>
        <p className="text-sm font-semibold">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-xl text-gray-600 hover:text-gray-900"
      >
        ×
      </button>
    </div>
  );
};

export default CustomAlert;
