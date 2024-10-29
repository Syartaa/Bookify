import React from 'react';
import { useParams } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "The Future of Digital Reading",
    author: "John Doe",
    date: "October 28, 2024",
    genre: "Non-fiction, Technology",
    publisher: "TechWorld Publications",
    pageCount: 300,
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
    fullContent: "From thrilling mysteries to insightful biographies, this list covers something for every reader's taste. Join us as we explore each book in detail, covering why they stood out this year...",
  },
  // More articles...
];

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <p className="text-center mt-10">Article not found.</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-pink-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 border-l-4 border-coral-400">
        <h1 className="text-4xl font-semibold text-coral-700 mb-4">{article.title}</h1>
        <p className="text-gray-500 text-sm mb-2">
          By <span className="font-medium">{article.author}</span> on {article.date}
        </p>
        <p className="text-gray-600 mb-2"><strong>Genre:</strong> {article.genre}</p>
        <p className="text-gray-600 mb-2"><strong>Publisher:</strong> {article.publisher}</p>
        <p className="text-gray-600 mb-8"><strong>Page Count:</strong> {article.pageCount}</p>
        <p className="text-gray-700">{article.fullContent}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;
