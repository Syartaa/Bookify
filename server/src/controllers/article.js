// controllers/articleController.js
const Article = require('../models/article');

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, imageUrl, userId } = req.body;
    const article = await Article.create({
      title,
      content,
      imageUrl,
      userId, // assuming userId comes from the authenticated user
    });
    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating article' });
  }
};

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching article' });
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const article = await Article.findByPk(req.params.id);
    if (article) {
      article.title = title || article.title;
      article.content = content || article.content;
      article.imageUrl = imageUrl || article.imageUrl;
      await article.save();
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating article' });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      await article.destroy();
      res.status(200).json({ message: 'Article deleted' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting article' });
  }
};
