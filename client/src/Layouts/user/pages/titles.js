import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import { useUser } from '../../../helper/userContext';
import { FaBookmark } from 'react-icons/fa';

const Titles = () => {
  const user = useUser();
  const userId = user?.user?.id;
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const apiUrl = 'http://localhost:3001/book';
  const categoryUrl = 'http://localhost:3001/category';
  const favoriteUrl = 'http://localhost:3001/favorite';

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoryUrl);
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${favoriteUrl}/${userId}`);
      setFavorites(response.data.map((fav) => fav.bookId));
    } catch (err) {
      console.error("Error fetching favorites:", err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchFavorites();
  }, []);

  const handleFavoriteToggle = async (bookId) => {
    try {
      if (favorites.includes(bookId)) {
        await axios.delete(`${favoriteUrl}/${userId}/${bookId}`);
        setFavorites(favorites.filter((id) => id !== bookId));
      } else {
        await axios.post(favoriteUrl, { userId, bookId });
        setFavorites([...favorites, bookId]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err.message);
    }
  };

  const filteredBooks =
    selectedCategory === 'All'
      ? books
      : books.filter((book) => book.category.name === selectedCategory);

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-[#fdf5f0]">
      <HeroSection />

      <div className="p-6 bg-white shadow-md">
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex justify-center flex-wrap space-x-4 mt-4 border-b border-gray-300 pb-4">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`pb-2 ${
              selectedCategory === 'All'
                ? 'border-b-4 border-black text-black'
                : 'text-gray-500 hover:text-black'
            } text-base md:text-lg transition-colors duration-300`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`pb-2 ${
                selectedCategory === category.name
                  ? 'border-b-4 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              } text-base md:text-lg transition-colors duration-300`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className="flex flex-col md:flex-row p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 cursor-pointer w-full"
            >
              <img
                src={`http://localhost:3001/${book.image}`}
                alt={book.title}
                className="w-full h-60 md:w-32 md:h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {book.title}
                  </h2>
                  <p className="text-sm md:text-lg text-gray-600 mt-1">
                    {typeof book.author === 'string' ? book.author : book.author.name}
                  </p>
                  <div className="flex items-center mt-2 md:mt-4">
                    <span className="text-yellow-500 text-lg md:text-xl">
                      {'★'.repeat(book.rating || 0)}
                    </span>
                    <span className="ml-1 text-sm md:text-lg text-gray-500">
                      {book.rating ? book.rating.toFixed(1) : 'No rating'}
                    </span>
                    <span className="ml-2 text-sm md:text-lg text-gray-500">
                      • {book.reviewsCount || 0} ratings
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm md:text-lg text-gray-700 line-clamp-3">
                  {book.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(book.id);
                  }}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <FaBookmark
                    className={`${favorites.includes(book.id) ? 'text-blue-500' : 'text-gray-300'}`}
                    size={24}
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg italic">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Titles;
