import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBookOpen, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import quote11 from "../../../image/quote11.jpg";
import quote3 from "../../../image/quote33.jpg";
import quote4 from "../../../image/quote4.jpg";
import quote5 from "../../../image/quote5.jpg";
import quote6 from "../../../image/quote6.jpg";
import quote44 from "../../../image/quote44.jpg";
import quote55 from "../../../image/quote55.jpg";
import quote77 from "../../../image/quote77.jpg";
import AuthorSlider from "./book/AuthorSlider";

const sliderImages = [quote11, quote3, quote4, quote5, quote6, quote44, quote55, quote77];
const quotes = [
  {
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
  },
  {
    text: "So many books, so little time.",
    author: "Frank Zappa",
    color: "bg-gradient-to-r from-green-400 to-blue-500",
  },
  {
    text: "The only thing that you absolutely have to know, is the location of the library.",
    author: "Albert Einstein",
    color: "bg-gradient-to-r from-yellow-500 to-red-500",
  },
  {
    text: "Reading is to the mind what exercise is to the body.",
    author: "Joseph Addison",
    color: "bg-gradient-to-r from-indigo-500 to-blue-400",
  },
  {
    text: "I do believe something very magical can happen when you read a good book.",
    author: "J.K. Rowling",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
    color: "bg-gradient-to-r from-blue-500 to-teal-500",
  },
];

const Home = () => {
  const [books, setBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [popularBooks, setPopularBooks] = useState([]);

 

  // Fetch books data from the backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/book"); // Replace with your actual endpoint
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);


  useEffect(() => {
    const fetchPopularBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/book/popularbooks'); // Update this URL to match your new endpoint
            setPopularBooks(response.data);
        } catch (error) {
            console.error('Error fetching popular books:', error);
        }
    };

    fetchPopularBooks();
}, []);


  // Slider effect for quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf5f0] flex flex-col items-center font-serif">
      <section className="text-center mt-12 mb-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-[#563f32]">Unlock the Magic of Reading</h1>
        <p className="text-gray-600 mt-4 mb-8">Discover new books and authors</p>

        {/* Slider with Decorative Elements */}
        <div className="relative w-full max-w-5xl mt-8 px-8 flex items-center">
          <div className="w-full h-[400px] mx-auto">
            <img
              src={sliderImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="w-full max-w-5xl mx-auto px-8 py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-white">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className={`${quote.color} p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center`}
          >
            <FaQuoteLeft className="text-3xl mb-2 opacity-75" />
            <p className="text-lg italic mb-2">"{quote.text}"</p>
            <p className="text-sm mt-1">- {quote.author}</p>
          </div>
        ))}
      </section>
      <h2 className="text-3xl font-bold text-center mt-3">Popular Books</h2>
      {/* Books Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 mt-16 bg-white rounded-lg shadow-md">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {popularBooks.map((book) => (
      <div
        key={book.id}
        className="bg-[#fdf5f0] rounded-lg p-6 shadow-md transform transition duration-300 hover:scale-105 hover:bg-[#f9ece5] hover:shadow-lg"
      >
        <img
          src={`http://localhost:3001/${book.image}`}
          alt={book.title}
          className="w-full object-contain rounded-lg mb-4 transition-transform duration-300"
          style={{ height: '300px' }} // Adjust height to make the image smaller
        />
        <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
        <p className="text-gray-600 mt-2">Author: {book.author.name}</p>
        <Link
          to={`/books/${book.id}`}
          className="mt-4 inline-block bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    ))}
  </div>
</section>



      {/* Modal */}
      <AuthorSlider />
    </div>
  );
};

export default Home;
