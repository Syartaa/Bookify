import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "The Future of Digital Reading",
    author: "John Doe",
    date: "October 28, 2024",
    genre: "Non-fiction, Technology",
    publisher: "TechWorld Publications",
    pageCount: 300,
    content: "With advancements in digital technologies, reading habits are shifting towards eBooks, and mobile apps...",
    fullContent: "In this article, we’ll dive deeper into how this shift is influencing readers, the digital library revolution, and what the future holds for online bookshops...",
  },
  {
    id: 2,
    title: "Top 10 Books to Read This Year",
    author: "Jane Smith",
    date: "September 15, 2024",
    genre: "Literature",
    publisher: "Readers Guild",
    pageCount: 250,
    content: "Whether you're a fiction lover or a non-fiction enthusiast, our top 10 books for this year will keep you entertained...",
    fullContent: "From thrilling mysteries to insightful biographies, this list covers something for every reader's taste. Join us as we explore each book in detail, covering why they stood out this year...",
  },
  // Add more articles here
];

const ArticlesPage = () => {
  return (
    <div className="min-h-screen p-8 bg-pink-50">
      <h1 className="text-5xl font-bold text-center mb-10 text-coral-700">Articles</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white shadow-md rounded-lg p-8 border-l-4 border-coral-400">
            <div className="flex items-center mb-4">
              <FaBookOpen className="text-coral-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-coral-700">{article.title}</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              By <span className="font-medium">{article.author}</span> on {article.date}
            </p>
            <p className="text-gray-700 mb-4">{article.content}</p>
            <Link to={`/articles/${article.id}`}>
              <button className="px-4 py-2 bg-coral-500 text-gray-500 font-semibold rounded-lg hover:bg-coral-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
                Read More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
