import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from './ReviewSection';
import { useUser } from '../../../../helper/userContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [reservedBySomeoneElse, setReservedBySomeoneElse] = useState(false);
  const user = useUser();
  const userId = user?.user?.id;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/book/${id}`);
        const bookData = response.data;

        // Check if the book is currently reserved by someone
        const reservationResponse = await axios.get(`http://localhost:3001/reservation/book/${id}`);
        const isReservedByOther = reservationResponse.data.isReserved && reservationResponse.data.reservation.userId !== userId;

        // Set reserved status and availability
        setReservedBySomeoneElse(isReservedByOther);
        setBook({ ...bookData, availabilityStatus: isReservedByOther ? 'reserved' : bookData.availabilityStatus });
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const checkReservationStatus = async () => {
      try {
        // Check if the current user has reserved the book
        const userReservation = await axios.get(`http://localhost:3001/reservation/user/${userId}/book/${id}`);
        setIsReserved(userReservation.data.isReserved);

        // If not reserved by the user, check if anyone else has reserved it
        if (!userReservation.data.isReserved) {
          const otherReservation = await axios.get(`http://localhost:3001/reservation/book/${id}`);
          const isReservedByOther = otherReservation.data.isReserved && otherReservation.data.reservation.userId !== userId;
          setReservedBySomeoneElse(isReservedByOther);
          setBook((prevBook) => ({ ...prevBook, availabilityStatus: isReservedByOther ? 'reserved' : 'available' }));
        }
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
      await axios.post('http://localhost:3001/reservation', reservationData);
      alert(`You have reserved ${book.title}!`);
      setIsReserved(true);
      setReservedBySomeoneElse(false);
      setBook((prevBook) => ({ ...prevBook, availabilityStatus: 'reserved' }));
    } catch (error) {
      console.error('Error reserving book:', error);
      alert('Failed to reserve the book. Please try again.');
    }
  };

  const handleUnreserve = async () => {
    try {
      await axios.delete(`http://localhost:3001/reservation/user/${userId}/book/${id}`);
      alert(`You have unreserved ${book.title}!`);
      setIsReserved(false);
      setBook((prevBook) => ({ ...prevBook, availabilityStatus: 'available' }));
    } catch (error) {
      console.error('Error unreserving book:', error);
      alert('Failed to unreserve the book. Please try again.');
    }
  };

  const handleLoan = async () => {
    if (!userId || !book) {
        alert('Unable to loan the book. Please try again.');
        return;
    }

    const loanData = {
        bookId: book.id,
        userId: userId,
    };

    try {
        await axios.post('http://localhost:3001/loan', loanData);
        alert(`You have loaned ${book.title}!`);
        setBook((prevBook) => ({ ...prevBook, availabilityStatus: 'borrowed' }));
    } catch (error) {
        console.error('Error loaning book:', error);
        alert('Failed to loan the book. Please try again.');
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

          {reservedBySomeoneElse && !isReserved && (
            <div className="bg-red-100 text-red-700 font-semibold p-4 rounded mb-6">
              This book is currently reserved by another user.
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              About this ebook
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Published on:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
            <p><strong>Category:</strong> {book.category.name}</p>
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
                className={`py-3 px-8 rounded-lg font-semibold transition duration-300 ${
                  reservedBySomeoneElse
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={book.availabilityStatus !== 'available' || reservedBySomeoneElse}
              >
                {reservedBySomeoneElse ? 'Reserved by Another User' : 'Reserve'}
              </button>
            )}
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
