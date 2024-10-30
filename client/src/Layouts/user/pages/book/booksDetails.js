// BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from './ReviewSection';
import { useUser } from '../../../../helper/userContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const user = useUser(); // Access the user data
  const userId = user?.user?.id; // Access the ID inside the nested 'user' object


  console.log('User:', user);
  console.log('User ID:', userId); // Check if userId is available

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;
  if (!user) return <div>Loading user data...</div>; // Ensure user is loaded

  const handleReserve = () => {
    alert(`You have reserved ${book.title}!`);
  };

  const handleLoan = () => {
    alert(`You have loaned ${book.title}!`);
  };

  return (
    <div className="min-h-screen bg-white p-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{book.title}</h1>
          <p className="text-2xl text-gray-600 mb-6">
            by {book.author && book.author.name ? book.author.name : 'Unknown Author'}
          </p>

          <div className="flex items-center mb-6">
            <span
              className={`px-4 py-2 rounded-full text-lg font-semibold ${
                book.availabilityStatus === 'available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {book.availabilityStatus}
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              About this ebook
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Published on:</strong>{' '}
              {new Date(book.publishedDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Category:</strong> {book.category.name}
            </p>
          </div>

          <div className="mt-8 flex gap-6">
            <button
              onClick={handleReserve}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              disabled={book.availabilityStatus !== 'available'}
            >
              Reserve
            </button>
            <button
              onClick={handleLoan}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              disabled={book.availabilityStatus !== 'available'}
            >
              Loan
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img
            src={`http://localhost:3001/${book.image}`}
            alt={book.title}
            className="w-80 h-[480px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-15">
        {userId ? (
          <ReviewSection bookId={book.id} userId={userId} />
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
