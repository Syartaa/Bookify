// models/article.js
// src/models/article.js
const sequelize = require('../util/database'); // Adjusted to match the actual path
const { Sequelize } = require("sequelize");


const Article = sequelize.define('article', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Article;
