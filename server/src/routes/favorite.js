const express = require('express');
const favoriteController = require('../controllers/favorite');
const router = express.Router();

router.get('/:userId', favoriteController.getFavoritesByUserId);
router.post('/', favoriteController.addFavorite);
router.delete('/:userId/:bookId', favoriteController.removeFavorite);

module.exports = router;
