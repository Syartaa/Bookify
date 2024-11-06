import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditArticle = () => {
  const { id } = useParams();
  const history = useHistory();
  const [article, setArticle] = useState({ title: '', content: '', imageUrl: '' });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/article/${id}`, article);
      alert('Article updated successfully!');
      history.push('/article');
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={article.title} 
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        required 
      />
      <textarea 
        value={article.content} 
        onChange={(e) => setArticle({ ...article, content: e.target.value })}
        required 
      />
      <input 
        type="url" 
        value={article.imageUrl} 
        onChange={(e) => setArticle({ ...article, imageUrl: e.target.value })}
        required 
      />
      <button type="submit">Update Article</button>
    </form>
  );
};

export default EditArticle;
