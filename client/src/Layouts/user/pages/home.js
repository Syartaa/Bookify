import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBookOpen, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import greatGatsbyImg from "../../../image/book1.jpeg";
import nineteenEightyFourImg from "../../../image/book2.jpeg";
import toKillAMockingbirdImg from "../../../image/book3.jpeg";
import prideAndPrejudiceImg from "../../../image/book4.jpeg";
import catcherInTheRyeImg from "../../../image/book5.jpeg";
import mobyDickImg from "../../../image/book6.jpeg";
import quote11 from "../../../image/quote11.jpg";
import quote3 from "../../../image/quote33.jpg";
import quote4 from "../../../image/quote4.jpg";
import quote5 from "../../../image/quote5.jpg";
import quote6 from "../../../image/quote6.jpg";
import quote44 from "../../../image/quote44.jpg";
import quote55 from "../../../image/quote55.jpg";
import quote77 from "../../../image/quote77.jpg";

const booksData = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: greatGatsbyImg },
  { title: "1984", author: "George Orwell", image: nineteenEightyFourImg },
  { title: "To Kill a Mockingbird", author: "Harper Lee", image: toKillAMockingbirdImg },
  { title: "Pride and Prejudice", author: "Jane Austen", image: prideAndPrejudiceImg },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", image: catcherInTheRyeImg },
  { title: "Moby-Dick", author: "Herman Melville", image: mobyDickImg },
];

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
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openModal = (book) => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf5f0] flex flex-col items-center font-serif">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-800">BOOKIFY</div>
        <nav className="space-x-8 flex items-center">
          <Link to="/authors" className="text-gray-700 hover:text-pink-500">Authors</Link>
          <Link to="/titles" className="text-gray-700 hover:text-pink-500">Titles</Link>
          <Link to="/articles" className="text-gray-700 hover:text-pink-500">Articles</Link>
          <Link to="/contact" className="text-gray-700 hover:text-pink-500">Contact Us</Link>
          <FaUserCircle className="text-3xl text-gray-700 hover:text-pink-500" />
        </nav>
      </header>

      {/* Hero Section with Automatic Slider */}
      <section className="text-center mt-12 mb-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-[#563f32]">Unlock the Magic of Reading</h1>
        <p className="text-gray-600 mt-4 mb-8">Discover new books and authors</p>

        {/* Slider with Decorative Elements */}
        <div className="relative w-full max-w-5xl mt-8 px-8 flex items-center">
          {/* Decorative Left Side */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <span className="text-4xl font-bold text-gray-400">📚</span>
          </div>

          <div className="w-full h-[400px] mx-auto">
            <img
              src={sliderImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Decorative Right Side */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <span className="text-4xl font-bold text-gray-400">✨</span>
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

      {/* Books Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 mt-16 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksData.map((book, index) => (
            <div key={index} className="bg-[#fdf5f0] rounded-lg p-6 shadow-md">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600 mt-2">Author: {book.author}</p>
              <button
                className="mt-4 inline-block bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                onClick={() => openModal(book)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
            <p className="text-gray-600 mb-4">Author: {selectedBook.author}</p>
            <img
              src={selectedBook.image}
              alt={selectedBook.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <button
              className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
