const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");
const Book = require("./book");


const Review = sequelize.define("review", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },


  rating: {
    type: Sequelize.INTEGER,
    allowNull: false, // Ensure rating is required
    validate: {
      min: 1, // Minimum rating
      max: 5, // Maximum rating
    },
  },

  comment: Sequelize.STRING,


  bookId: {
    type: Sequelize.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
    allowNull: false,
  },

  
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
});

// Correct associations
Book.hasMany(Review, { foreignKey: "bookId" });
Review.belongsTo(Book, { foreignKey: "bookId" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

module.exports = Review;
