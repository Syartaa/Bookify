import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from './ReviewSection';
import { useUser } from '../../../../helper/userContext';
import { FaBookmark } from 'react-icons/fa';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isReserved, setIsReserved] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false);  // Track if the book is borrowed
  const [reservedBySomeoneElse, setReservedBySomeoneElse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const user = useUser();
  const userId = user?.user?.id;

  const favoriteUrl = 'http://localhost:3001/favorite';

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/book/${id}`);
        const bookData = response.data;

        const reservationResponse = await axios.get(`http://localhost:3001/reservation/book/${id}`);
        const isReservedByOther = reservationResponse.data.isReserved && reservationResponse.data.reservation.userId !== userId;

        setReservedBySomeoneElse(isReservedByOther);
        setBook({ ...bookData, availabilityStatus: isReservedByOther ? 'reserved' : bookData.availabilityStatus });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError("Failed to load book details. Please try again later.");
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${favoriteUrl}/${userId}`);
        setFavorites(response.data.map((fav) => fav.bookId));
      } catch (err) {
        console.error('Error fetching favorites:', err.message);
      }
    };

    const checkReservationAndBorrowStatus = async () => {
      try {
        // Check if the user has reserved the book
        const userReservation = await axios.get(`http://localhost:3001/reservation/user/${userId}/book/${id}`);
        setIsReserved(userReservation.data.isReserved);

        // Check if the book is borrowed
        const borrowedResponse = await axios.get(`http://localhost:3001/borrowed/book/${id}`);
        setIsBorrowed(borrowedResponse.data.isBorrowed);

        if (!userReservation.data.isReserved) {
          const otherReservation = await axios.get(`http://localhost:3001/reservation/book/${id}`);
          const isReservedByOther = otherReservation.data.isReserved && otherReservation.data.reservation.userId !== userId;
          setReservedBySomeoneElse(isReservedByOther);
          setBook((prevBook) => ({ ...prevBook, availabilityStatus: isReservedByOther ? 'reserved' : 'available' }));
        }
      } catch (error) {
        console.error('Error checking reservation or borrowed status:', error);
      }
    };

    fetchBook();
    if (userId) fetchFavorites();
    if (userId) checkReservationAndBorrowStatus();
  }, [id, userId]);

  const handleFavoriteToggle = async () => {
    try {
      if (favorites.includes(book.id)) {
        await axios.delete(`${favoriteUrl}/${userId}/${book.id}`);
        setFavorites(favorites.filter((id) => id !== book.id));
      } else {
        await axios.post(favoriteUrl, { userId, bookId: book.id });
        setFavorites([...favorites, book.id]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err.message);
    }
  };

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
      alert(`You have reserved ${book.title}! You will be notified when it becomes available.`);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white p-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{book.title}</h1>
          <p className="text-2xl text-gray-600 mb-6">by {book.author && book.author.name ? book.author.name : 'Unknown Author'}</p>

          <div className="flex items-center mb-6">
            <span
              className={`px-4 py-2 rounded-full text-lg font-semibold ${book.availabilityStatus === 'available' ? 'bg-green-100 text-green-800' : 
                book.availabilityStatus === 'reserved' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
            >
              {isBorrowed ? 'Borrowed' : book.availabilityStatus}
            </span>
          </div>

          {reservedBySomeoneElse && !isReserved && (
            <div className="bg-red-100 text-red-700 font-semibold p-4 rounded mb-6">
              This book is currently reserved by another user.
            </div>
          )}

          {isBorrowed && !reservedBySomeoneElse && !isReserved && (
            <div className="bg-yellow-100 text-yellow-800 font-semibold p-4 rounded mb-6">
              This book is borrowed. You can reserve it for when it becomes available.
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">About this ebook</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{book.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Published on:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
            <p><strong>Category:</strong> {book.category?.name || 'N/A'}</p>
          </div>

          <div className="mt-8 flex gap-6">
            {isReserved ? (
              <button onClick={handleUnreserve} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                Unreserve
              </button>
            ) : (
              <button onClick={handleReserve} className={`py-3 px-8 rounded-lg font-semibold transition duration-300 ${reservedBySomeoneElse ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`} disabled={reservedBySomeoneElse}>
                {reservedBySomeoneElse ? 'Reserved by Another User' : 'Reserve'}
              </button>
            )}
            <button onClick={handleFavoriteToggle} className="text-2xl">
              <FaBookmark color={favorites.includes(book.id) ? 'gold' : 'gray'} />
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img src={`http://localhost:3001/${book.image}`} alt={book.title} className="w-80 h-[480px] object-cover rounded-lg shadow-lg" />
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
