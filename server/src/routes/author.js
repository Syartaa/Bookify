const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/author');

// Define routes
router.get('/', AuthorController.getAllAuthors);
router.get('/:id', AuthorController.getAuthorById);
router.post('/', AuthorController.createAuthor);
router.put('/:id', AuthorController.updateAuthor);
router.delete('/:id', AuthorController.deleteAuthor);

module.exports = router;
