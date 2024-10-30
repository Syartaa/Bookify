import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = ({ bookId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/review/book/${bookId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (comment.trim().split(" ").length < 1000) {
    //   alert("Review must be at least 10 words.");
    //   return;
    // }
    try {
      await axios.post(`http://localhost:3001/review`, {
        rating,
        comment,
        bookId,
        userId,
      });
      setComment("");
      setRating(0);
      const response = await axios.get(
        `http://localhost:3001/review/book/${bookId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-md shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-4">What did you think?</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-3xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-gray-500 text-sm">Tap to rate</span>
        </div>

        <textarea
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell others what you thought of this book"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Review must be at least 10 words
        </p>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg mt-4 transition duration-300"
        >
          Submit Review
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">
        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
      </h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{review.user.name}</span>
              <span className="flex items-center">
                <span className="text-yellow-500 text-lg">
                  {'★'.repeat(review.rating)}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {review.rating}/5
                </span>
              </span>
            </div>
            <p className="text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
