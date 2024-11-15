import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetailPage = () => {
  const { id } = useParams(); // Get article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch article details by ID
    axios.get(`http://localhost:3001/article/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error('Error fetching article details:', error);
      });
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <section className="py-24 bg-[#fdf5f0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
          <img src={`http://localhost:3001/${article.imageUrl}`} alt={article.title} className="rounded-2xl mb-4" />
          <p className="text-gray-700 mb-4">{article.content}</p>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetailPage;
