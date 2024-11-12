const Article = require('../models/article');

// Create a new article
const createArticle = async (req, res) => {
  const { title, content, userId } = req.body;
  const imageUrl = req.file ? req.file.path : null; // Get the image path from the uploaded file

  try {
    const article = await Article.create({
      title,
      content,
      imageUrl, // Save the image path
      userId, // assuming userId comes from the authenticated user
    });
    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating article' });
  }
};

// Get all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
};

// Get a single article by ID
const getArticleById = async (req, res) => {
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
const updateArticle = async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? req.file.path : null; // Get the new image path if uploaded

  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      // Update fields if provided
      article.title = title || article.title;
      article.content = content || article.content;
      article.imageUrl = imageUrl || article.imageUrl; // Update image only if a new one is uploaded
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
const deleteArticle = async (req, res) => {
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

module.exports = {
  deleteArticle,
  createArticle,
  getArticleById,
  getArticles,
  updateArticle
};
