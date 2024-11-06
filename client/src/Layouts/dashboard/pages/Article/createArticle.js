import React, { useState } from 'react';
import axios from 'axios';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = { title, content, imageUrl };

    try {
      await axios.post('http://localhost:3001/articles', newArticle); // Make the POST request
      alert('Article created successfully!');
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Failed to create article');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required
      />
      <input 
        type="url" 
        placeholder="Image URL" 
        value={imageUrl} 
        onChange={(e) => setImageUrl(e.target.value)} 
        required
      />
      <button type="submit">Create Article</button>
    </form>
  );
};

export default CreateArticle;
