import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  const handleReserve = () => {
    alert(`You have reserved ${book.title}!`);
  };

  const handleLoan = () => {
    alert(`You have loaned ${book.title}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
        {/* Book Image */}
        <div className="flex-shrink-0">
          <img
            src={book.image}
            alt={book.title}
            className="w-64 h-96 object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Book Details Section */}
        <div className="flex flex-col justify-start">
          <h1 className="text-5xl font-extrabold text-gray-800">{book.title}</h1>
          <p className="text-2xl text-gray-600 mt-2">by {book.author}</p>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Description</h2>
            <p className="mt-2 text-gray-600">{book.description}</p>
          </div>

          {/* Book Info */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <p className="text-md text-gray-800">
              <strong>ISBN:</strong> {book.ISBN}
            </p>
            <p className="text-md text-gray-800">
              <strong>Published on:</strong> {new Date(book.publicationDate).toLocaleDateString()}
            </p>
            <p className="text-md text-gray-800">
              <strong>Category:</strong> {book.category}
            </p>
            <p className={`text-md font-semibold ${book.available ? 'text-green-500' : 'text-red-500'}`}>
              Status: {book.available ? "Available" : "Currently Unavailable"}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleReserve}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
              disabled={!book.available}
            >
              Reserve
            </button>
            <button
              onClick={handleLoan}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
              disabled={!book.available}
            >
              Loan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
