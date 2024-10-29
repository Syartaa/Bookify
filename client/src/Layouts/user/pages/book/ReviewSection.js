import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/review?bookId=${bookId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/review`, { rating, comment, bookId });
      setComment("");
      setRating(0);
      const response = await axios.get(`http://localhost:3001/review?bookId=${bookId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-2 text-center">Reviews for The Ingenious Edgar Jones</h2>
      <div className="text-center text-gray-600 mb-4">
        <span className="text-yellow-500">{'★'.repeat(0)}</span> {/* You can dynamically display average rating here */}
        <span> 0 ratings • {reviews.length} reviews</span>
      </div>
      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border-b mb-4 pb-4">
            <div className="flex items-center justify-center">
              <span className="text-lg font-semibold">{review.user.name}</span>
              <span className="ml-2 text-yellow-500">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="text-gray-700 text-center">{review.comment}</p>
          </div>
        ))
      )}
      <form onSubmit={handleSubmit} className="mt-6">
        <h3 className="text-xl font-semibold text-center">What did you think?</h3>
        <div className="flex items-center justify-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              onClick={() => setRating(star)} 
              className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell others what you thought of this book"
          className="w-full border border-gray-300 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded mt-2 block mx-auto hover:bg-blue-700 transition duration-200">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
