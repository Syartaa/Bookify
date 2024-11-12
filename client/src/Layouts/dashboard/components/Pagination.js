import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Handle previous and next page clicks
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        Previous
      </button>
      <span className="text-lg text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
