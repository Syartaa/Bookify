// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

// Create a new article
router.post('/articles', articleController.createArticle);

// Get all articles
router.get('/articles', articleController.getArticles);

// Get a single article by ID
router.get('/articles/:id', articleController.getArticleById);

// Update an article by ID
router.put('/articles/:id', articleController.updateArticle);

// Delete an article by ID
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
