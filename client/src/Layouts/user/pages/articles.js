import React, { useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';

// Sample article data
const articles = [
  {
    id: 1,
    title: "The Future of Digital Reading",
    author: "John Doe",
    date: "October 28, 2024",
    content: "With advancements in digital technologies, reading habits are shifting towards eBooks and mobile apps expanding...",
    imageUrl: "https://pagedone.io/asset/uploads/1696244059.png",
  },
  {
    id: 2,
    title: "Top 10 Books to Read This Year",
    author: "Jane Smith",
    date: "September 15, 2024",
    content: "Whether you're a fiction lover or a non-fiction enthusiast, our top 10 books for this year will keep you entertained for a very long time...",
    imageUrl: "https://pagedone.io/asset/uploads/1696244074.png",
  },
  {
    id: 3,
    title: "Mastering Web Development in 2024",
    author: "Alex Johnson",
    date: "August 10, 2024",
    content: "This article covers the latest trends in web development, including popular frameworks like the most popular ones..",
    imageUrl: "https://pagedone.io/asset/uploads/1707713972.png",
  },
  // Add more articles as needed...
];

const ArticlesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedArticle, setSelectedArticle] = useState(null); // State for the selected article

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const handleReadMore = (id) => {
    const article = articles.find((article) => article.id === id);
    setSelectedArticle(article); // Set the selected article
    setIsModalOpen(true); // Open the modal
  };

  return (
    <section className="py-24 bg-orange-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8">
          <div className="w-full flex justify-between flex-col lg:w-2/5">
            <div className="block lg:text-left text-center">
              <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-5">
                Our latest <span className="text-indigo-600">articles</span>
              </h2>
              <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                Welcome to our articles section, where knowledge meets inspiration. Explore insightful articles, expert tips, and the latest trends in our field.
              </p>
              <button onClick={toggleModal} className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100">
                View All
              </button>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md transition-transform duration-300 hover:scale-105">
                  <img src={article.imageUrl} alt={article.title} className="rounded-2xl w-full object-cover mb-4" />
                  <h3 className="text-xl text-gray-900 font-medium leading-8 mb-2">{article.title}</h3>
                  <p className="text-gray-500 leading-6 mb-2">{article.content}</p>
                  <button onClick={() => handleReadMore(article.id)} className="flex items-center gap-2 text-lg text-indigo-700 font-semibold">
                    Read more
                    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5" stroke="#4338CA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for selected article */}
      {isModalOpen && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="rounded-2xl mb-4" />
            <p className="text-gray-700 mb-4">{selectedArticle.content}</p>
            <button onClick={toggleModal} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArticlesPage;
