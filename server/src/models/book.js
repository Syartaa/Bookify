const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const { DataTypes } = Sequelize; 
const Cateogory = require("./category");
const Author = require("./author");


const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: Sequelize.STRING,

  isbn: Sequelize.STRING,
  publishedDate: Sequelize.DATE,
  description: Sequelize.STRING,
  image: {
    type: Sequelize.STRING, // Use STRING to store the URL/path of the image
    allowNull: true, // Optional: Set to true if the image is not mandatory
  },
  availabilityStatus: {
    type: DataTypes.ENUM('available', 'borrowed','reserved'), // You can add more roles if needed
    defaultValue: 'available' // Default to 'available' role
  },

  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Cateogory,
      key: "id",
    },
    allowNull: false,
  },

  
  authorId: {
    type: Sequelize.INTEGER,
    references: {
      model: Author,
      key: "id",
    },
    allowNull: false,
  },
});

Cateogory.hasMany(Book, { foreignKey: "categoryId" })
Book.belongsTo(Cateogory, { foreignKey: "categoryId" })

Author.hasMany(Book, { foreignKey: "authorId" })
Book.belongsTo(Author, { foreignKey: "authorId" })

module.exports = Book;
