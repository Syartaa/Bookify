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
  
  description: {
    type: Sequelize.TEXT('long'), // Use 'long' variant for larger text in MySQL
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING, // Use STRING to store the URL/path of the image
    allowNull: true, // Optional: Set to true if the image is not mandatory
  },
  availabilityStatus: {
    type: DataTypes.ENUM('available', 'borrowed', 'reserved'), // You can add more roles if needed
    defaultValue: 'available', // Default to 'available' role
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

  popularity: {
    type: Sequelize.INTEGER, // Field to store popularity score (e.g., 1 to 5)
    defaultValue: 0, // Default value for popularity
    allowNull: false,
  },
});

// Relationships
Cateogory.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Cateogory, { foreignKey: "categoryId" });

Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: "authorId" });

module.exports = Book;
