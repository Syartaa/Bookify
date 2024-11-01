import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from './ReviewSection';
import { useUser } from '../../../../helper/userContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isReserved, setIsReserved] = useState(false); // Track if the user has reserved the book
  const user = useUser();
  const userId = user?.user?.id;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const checkReservationStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reservation/user/${userId}/book/${id}`);
        setIsReserved(response.data.isReserved);
      } catch (error) {
        console.error('Error checking reservation status:', error);
      }
    };

    fetchBook();
    if (userId) checkReservationStatus();
  }, [id, userId]);

  if (!book) return <div>Loading...</div>;
  if (!user) return <div>Loading user data...</div>;

  const handleReserve = async () => {
    if (!userId || !book) {
      alert('Unable to reserve the book. Please try again.');
      return;
    }
  
    const reservationData = {
      reservationDate: new Date().toISOString(),
      status: 'active',
      bookId: book.id,
      userId: userId,
    };
  
    try {
      const response = await axios.post('http://localhost:3001/reservation', reservationData);
      console.log('Reservation Response:', response.data);
      alert(`You have reserved ${book.title}!`);
      setIsReserved(true); // Update reservation status
    } catch (error) {
      console.error('Error reserving book:', error);
      alert('Failed to reserve the book. Please try again.');
    }
  };

  const handleUnreserve = async () => {
    try {
      await axios.delete(`http://localhost:3001/reservation/user/${userId}/book/${id}`);
      alert(`You have unreserved ${book.title}!`);
      setIsReserved(false); // Update reservation status
    } catch (error) {
      console.error('Error unreserving book:', error);
      alert('Failed to unreserve the book. Please try again.');
    }
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
            {isReserved ? (
              <button
                onClick={handleUnreserve}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Unreserve
              </button>
            ) : (
              <button
                onClick={handleReserve}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                disabled={book.availabilityStatus !== 'available'}
              >
                Reserve
              </button>
            )}
            <button
              onClick={() => alert(`You have loaned ${book.title}!`)}
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
