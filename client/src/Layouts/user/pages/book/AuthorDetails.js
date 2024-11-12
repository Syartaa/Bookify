import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const authorUrl = `http://localhost:3001/author/${id}`;
  const booksUrl = `http://localhost:3001/author/${id}/books`;

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const [authorResponse, booksResponse] = await Promise.all([
          axios.get(authorUrl),
          axios.get(booksUrl),
        ]);
        setAuthor(authorResponse.data);
        setBooks(booksResponse.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAuthorData();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!author) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="bg-gradient-to-b from-[#fdf5f0] to-[#f2e8dc] min-h-screen p-8">
      {/* Author Info Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-2xl mb-12">
        <div className="flex flex-col items-center">
          {author.image ? (
            <img
              src={`http://localhost:3001/${author.image}`}
              alt={`${author.name}'s profile`}
              className="w-32 h-32 rounded-full object-cover mb-6 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-6 shadow-lg">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h1 className="text-4xl font-bold text-center text-[#563f32] mb-2">
            {author.name}
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-md">{author.bio}</p>
        </div>
      </div>

      {/* Books Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#563f32] mb-6 text-center">Books by {author.name}</h2>
        {books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform duration-200">
                <h3 className="text-xl font-semibold text-[#2a6478] mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.description || 'No description available.'}</p>
                <p className="text-sm text-gray-400">Published: {book.publishedDate || 'Unknown'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center italic">No books found for this author.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorDetails;
