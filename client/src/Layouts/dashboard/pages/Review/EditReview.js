import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function EditReview({ isOpen, onClose, onSave, reviewId, books, users }) {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (reviewId) {
            fetchReviewDetails();
        }
    }, [reviewId]);

    const fetchReviewDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/review/${reviewId}`);
            const review = response.data;

            setRating(review.rating);
            setComment(review.comment);
            setBookId(review.bookId);
            setUserId(review.userId);
        } catch (err) {
            console.error("Error fetching review details:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedReview = {
                rating,
                comment,
                bookId,
                userId,
            };
            await axios.put(`http://localhost:3001/review/${reviewId}`, updatedReview);
            onSave(); // Refresh the review list after saving
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating review:", err);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Edit Review</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <Label htmlFor="rating" value="Rating" />
                        <Select
                            id="rating"
                            required
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="comment" value="Comment" />
                        <TextInput
                            id="comment"
                            type="text"
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a review..."
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="bookId" value="Book" />
                        <Select
                            id="bookId"
                            required
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                        >
                            <option value="">Select Book</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="userId" value="User" />
                        <Select
                            id="userId"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
                        >
                            Save Changes
                        </Button>
                        <Button 
                            type="button" 
                            onClick={onClose} 
                            color="gray"
                            className="hover:bg-gray-400 transition duration-300"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditReview;
