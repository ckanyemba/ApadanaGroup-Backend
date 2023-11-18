import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from the server when the component mounts
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles'); // Adjust the endpoint based on your backend routes
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Author: {article.author}</p>
            <p>Tags: {article.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
