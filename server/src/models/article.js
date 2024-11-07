const { DataTypes } = require('sequelize');
// models/article.js
// src/models/article.js
const sequelize = require('../util/database'); // Adjusted to match the actual path



const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Article;
