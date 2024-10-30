// AuthorSlider.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AuthorSlider = () => {
  const [authors, setAuthors] = useState([]); // State for authors
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  // Fetch authors from API
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/author"); // Adjust API endpoint
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? authors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === authors.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full max-w-6xl mx-auto mt-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Authors</h2>

      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md"
        >
          ❮
        </button>

        {/* Author Cards */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              >
                <div className="bg-white rounded-lg shadow-lg p-6 h-[400px] flex flex-col justify-between">
                  <img
                    src={`http://localhost:3001/${author.image}`}
                    alt={author.name}
                    className="w-full h-60 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center text-gray-800">
                    {author.name}
                  </h3>
                  <p className="text-center text-pink-500 mt-2">
                    <Link to={`/authors/${author.id}`}>View Books</Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md"
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default AuthorSlider;
