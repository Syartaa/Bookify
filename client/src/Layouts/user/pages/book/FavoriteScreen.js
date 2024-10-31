import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { useUser } from '../../../../helper/userContext';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useUser(); // Access the user data
  const userId = user?.user?.id; // Access the ID inside the nested 'user' object

  const favoriteUrl = "http://localhost:3001/favorite";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${favoriteUrl}/${userId}`);
        setFavorites(response.data.map((fav) => fav.book)); // Assume the API returns favorite objects with a `book` field
      } catch (err) {
        console.error("Error fetching favorite books:", err);
        setError(err.message);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemoveFavorite = async (bookId) => {
    try {
      await axios.delete(`${favoriteUrl}/${userId}/${bookId}`);
      setFavorites(favorites.filter((book) => book.id !== bookId));
    } catch (err) {
      console.error("Error removing favorite:", err);
      alert("Failed to remove book from favorites.");
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-[#fdf5f0] p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
        My Favorite Books
      </h1>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">
          {favorites.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className="flex p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 cursor-pointer w-full sm:w-[26rem]"
            >
              <img
                src={`http://localhost:3001/${book.image}`}
                alt={book.title}
                className="w-32 h-48 object-cover rounded-lg mr-6"
              />
              <div className="flex flex-col justify-between flex-1 relative">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {book.title}
                  </h2>
                  <p className="text-lg text-gray-600 mt-1">
                    {book.author.name}
                  </p>
                  <div className="flex items-center mt-4">
                    <span className="text-yellow-500 text-xl">
                      {'★'.repeat(book.rating || 0)}
                    </span>
                    <span className="ml-2 text-lg text-gray-500">
                      {book.rating ? book.rating.toFixed(1) : 'No rating'}
                    </span>
                    <span className="ml-2 text-lg text-gray-500">
                      • {book.reviewsCount || 0} ratings
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-lg text-gray-700 line-clamp-3">
                  {book.description}
                </p>
                
                {/* Remove Favorite Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(book.id);
                  }}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaBookmark className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg italic">You have no favorite books.</p>
      )}
    </div>
  );
};

export default FavoriteScreen;
