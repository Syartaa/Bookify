import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/articles'); // Make sure this matches backend route
        setArticles(response.data); // Assuming response contains articles array
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      {articles.length > 0 ? (
        <div>
          {articles.map((article) => (
            <div key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <Link to={`/articles/edit/${article.id}`}>Edit</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default ArticleList;
