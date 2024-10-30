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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Book Titles
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Category Tabs */}
      <div className="flex justify-center space-x-6 border-b border-gray-300 mb-8">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`pb-2 ${
            selectedCategory === 'All'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500 hover:text-black'
          } transition-colors duration-300`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`pb-2 ${
              selectedCategory === category.name
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            } transition-colors duration-300`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="flex p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`http://localhost:3001/${book.image}`}
                alt={book.title}
                className="w-32 h-48 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {book.title}
                  </h2>
                  <p className="text-gray-600">
                    {typeof book.author === 'string'
                      ? book.author
                      : book.author.name}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">
                      {'★'.repeat(book.rating || 0)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {book.rating ? book.rating.toFixed(1) : 'No rating'}
                    </span>
                    <span className="ml-2 text-gray-500">
                      • {book.reviewsCount || 0} ratings
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center italic">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Titles;
