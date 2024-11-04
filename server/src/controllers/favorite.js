
const Book = require('../models/book');
const User = require('../models/user');
const Author = require('../models/author');
const Category = require('../models/category');
const Favorite = require('../models/favortie');

// Get all favorite books for a user
const getFavoritesByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await Favorite.findAll({
            where: { userId },
            include: [
                {
                    model: Book,
                    include: [
                        { model: Author, attributes: ['id', 'name'] },
                        { model: Category, attributes: ['id', 'name'] }
                    ]
                }
            ]
        });

        if (favorites.length === 0) {
            return res.status(404).json({ error: 'No favorites found for this user.' });
        }

        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a book to favorites
const addFavorite = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        // Check if the favorite already exists
        const existingFavorite = await Favorite.findOne({ where: { userId, bookId } });
        if (existingFavorite) {
            return res.status(409).json({ error: 'Book is already in favorites.' });
        }

        const favorite = await Favorite.create({ userId, bookId });
        res.status(201).json(favorite);
    } catch (error) {
        console.error('Error adding favorite:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Remove a book from favorites
const removeFavorite = async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        const favorite = await Favorite.findOne({ where: { userId, bookId } });
        if (!favorite) {
            return res.status(404).json({ error: 'Favorite not found.' });
        }

        await favorite.destroy();
        res.json({ message: 'Book removed from favorites.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getFavoritesByUserId,
    addFavorite,
    removeFavorite,
};
