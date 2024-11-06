const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your sequelize instance

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
