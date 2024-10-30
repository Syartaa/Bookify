import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Titles = () => {
  const [books, setBooks] = useState([]); // State to hold books
  const [categories, setCategories] = useState([]); // State to hold categories
  const [selectedCategory, setSelectedCategory] = useState('All'); // Track selected category
  const [error, setError] = useState(null); // Hold errors

  const apiUrl = 'http://localhost:3001/book';
  const categoryUrl = 'http://localhost:3001/category'; // Adjust as needed

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoryUrl);
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const filteredBooks =
    selectedCategory === 'All'
      ? books
      : books.filter((book) => book.category.name === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fdf5f0]">
      <div className="p-8 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Book Titles
        </h1>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Category Tabs */}
        <div className="flex justify-center space-x-8 mt-4 border-b border-gray-300 pb-4">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`pb-2 ${
              selectedCategory === 'All'
                ? 'border-b-4 border-black text-black'
                : 'text-gray-500 hover:text-black'
            } text-lg transition-colors duration-300`}
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
              } text-lg transition-colors duration-300`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="flex p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`http://localhost:3001/${book.image}`}
                alt={book.title}
                className="w-40 h-60 object-cover rounded-lg mr-6"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {book.title}
                  </h2>
                  <p className="text-lg text-gray-600 mt-1">
                    {typeof book.author === 'string'
                      ? book.author
                      : book.author.name}
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
