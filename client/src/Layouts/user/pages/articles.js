import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]); // State to store articles

  const navigate = useNavigate(); // Hook for navigation

  // Fetch articles from the API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/article') // Adjust the API URL accordingly
      .then((response) => {
        setArticles(response.data); // Set the fetched articles to state
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const handleReadMore = (id) => {
    navigate(`/articles/${id}`); // Navigate to the article detail page
  };

  return (
    <section className="py-24 bg-[#fdf5f0]">
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
              <button  className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100">
                View All
              </button>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md transition-transform duration-300 hover:scale-105">
                  <img src={`http://localhost:3001/${article.imageUrl}`} alt={article.title} className="rounded-2xl w-full object-cover mb-4" />
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
    </section>
  );
};

export default ArticlesPage;
