const Book = require('../models/book');
const Review = require('../models/review');
const User = require('../models/user');

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                { model: Book, attributes: ['id', 'title'] },
                { model: User, attributes: ['id', 'name'] }
            ],
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a review by ID
const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new review
const createReview = async (req, res) => {
    const { rating, comment, bookId, userId } = req.body;
    console.log('Creating review with userId:', userId);

    try {
        const review = await Review.create({
            rating,
            comment,
            bookId,
            userId,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a review
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment, bookId, userId } = req.body;

    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update review fields
        await review.update({
            rating: rating || review.rating,
            comment: comment || review.comment,
            bookId: bookId || review.bookId,
            userId: userId || review.userId,
        });

        res.json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await Review.findByPk(id);
        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await Review.destroy({ where: { id } });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
