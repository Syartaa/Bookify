import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBookOpen, FaQuoteLeft } from "react-icons/fa";
import greatGatsbyImg from "../../../image/book1.jpeg";
import nineteenEightyFourImg from "../../../image/book2.jpeg";
import toKillAMockingbirdImg from "../../../image/book3.jpeg";
import prideAndPrejudiceImg from "../../../image/book4.jpeg";
import catcherInTheRyeImg from "../../../image/book5.jpeg";
import mobyDickImg from "../../../image/book6.jpeg";
import quote11 from "../../../image/quote11.jpg";
import quote2 from "../../../image/quote2.avif";
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

const sliderImages = [
  quote11,
   quote3, quote4, quote5, quote6, quote44
   ,quote55,quote77
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
          <a href="#home" className="text-gray-700 hover:text-pink-500">Home</a>
          <a href="#payments" className="text-gray-700 hover:text-pink-500">Payments</a>
          <a href="#titles" className="text-gray-700 hover:text-pink-500">Titles</a>
          <a href="#articles" className="text-gray-700 hover:text-pink-500">Articles</a>
          <a href="#contact" className="text-gray-700 hover:text-pink-500">Contact Us</a>
          <FaUserCircle className="text-3xl text-gray-700 hover:text-pink-500" />
        </nav>
      </header>

      {/* Hero Section with Automatic Slider */}
      <section className="text-center mt-12 mb-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-[#563f32]">Unlock the Magic of Reading</h1>
        <p className="text-gray-600 mt-4 mb-8">Discover new books and authors</p>

        {/* Slider with Side Elements */}
        <div className="relative w-full max-w-5xl flex justify-between items-center mt-8">
          {/* Left Side Text */}
          <div className="w-1/4 text-center flex flex-col items-start">
            <FaQuoteLeft className="text-3xl text-pink-500 mb-4" />
            <p className="text-sm text-gray-700 italic">"A room without books is like a body without a soul."</p>
            <p className="text-xs mt-2">- Marcus Tullius Cicero</p>
          </div>

          {/* Automatic Image Slider */}
          <div className="relative w-[6000px] h-[400px] mx-auto">
            <img
              src={sliderImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side Elements */}
          <div className="w-1/4 text-center flex flex-col items-end">
            <FaBookOpen className="text-4xl text-pink-500 mb-4" />
            <p className="text-sm text-gray-700 italic">Discover, Read, Repeat.</p>
            <p className="text-xs mt-2">Your journey to a new world begins here.</p>
          </div>
        </div>
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

      {/* Footer */}
      <footer className="bg-[#fdf5f0] text-gray-700 text-center py-6 mt-auto">
        <p>&copy; 2024 Bookify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
