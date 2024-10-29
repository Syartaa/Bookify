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
  {
    id: 3,
    title: "Mastering Web Development in 2024",
    author: "Alex Johnson",
    date: "August 10, 2024",
    genre: "Technology, Web Development",
    publisher: "CodeWave",
    pageCount: 320,
    fullContent: "This article covers the latest trends in web development, including popular frameworks, essential tools, and insights into mastering frontend and backend technologies in 2024.",
  },
  {
    id: 4,
    title: "Understanding Artificial Intelligence",
    author: "Sarah Lee",
    date: "July 5, 2024",
    genre: "Science, Technology",
    publisher: "AI Insights",
    pageCount: 275,
    fullContent: "An in-depth look at AI's impact on various industries, from healthcare to finance, exploring how machine learning algorithms and neural networks are reshaping our world.",
  },
  {
    id: 5,
    title: "Best Practices for Mental Health",
    author: "Emma Thompson",
    date: "June 20, 2024",
    genre: "Self-Help, Psychology",
    publisher: "Wellbeing Press",
    pageCount: 200,
    fullContent: "Covering essential mental health practices, this article provides valuable insights and expert recommendations for maintaining mental wellness in a fast-paced world.",
  },
  {
    id: 6,
    title: "Climate Change and Its Effects",
    author: "Michael Green",
    date: "May 12, 2024",
    genre: "Environmental Science",
    publisher: "EcoLife Publications",
    pageCount: 310,
    fullContent: "Exploring the latest research on climate change, this article discusses global warming, its impact on ecosystems, and actionable steps individuals can take to help the environment.",
  },
  {
    id: 7,
    title: "The Rise of Remote Work",
    author: "Linda Harper",
    date: "April 25, 2024",
    genre: "Business, Technology",
    publisher: "FutureWorks",
    pageCount: 290,
    fullContent: "Examining the shift towards remote work, this article highlights benefits, challenges, and predictions for the future of work in a digital-first world.",
  },
  {
    id: 8,
    title: "Healthy Eating: Tips and Recipes",
    author: "David Brown",
    date: "March 15, 2024",
    genre: "Health, Nutrition",
    publisher: "Healthy Living Publications",
    pageCount: 180,
    fullContent: "This article provides a comprehensive guide to healthy eating, featuring tips for balanced meals and easy-to-make recipes to incorporate into a nutritious lifestyle.",
  },
  {
    id: 9,
    title: "Exploring Space: The Next Frontier",
    author: "Chris Martinez",
    date: "February 28, 2024",
    genre: "Science, Astronomy",
    publisher: "Galactic Publications",
    pageCount: 400,
    fullContent: "A captivating exploration of recent space missions, advancements in space travel technology, and what lies ahead as we venture deeper into the cosmos.",
  },
  {
    id: 10,
    title: "Financial Planning for Young Adults",
    author: "Samantha Clark",
    date: "January 10, 2024",
    genre: "Finance, Self-Help",
    publisher: "MoneyWise",
    pageCount: 220,
    fullContent: "A beginner's guide to personal finance, this article covers budgeting, saving, and investment strategies tailored to young adults entering the workforce.",
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
