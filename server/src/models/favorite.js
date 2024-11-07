const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const { DataTypes } = Sequelize; 

const Book = require("./book");
const User = require("./user");


const Favorite = sequelize.define("favorite", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, // Assumes a User model exists
          key: 'id',
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Book, // Assumes a Book model exists
          key: 'id',
        },
      },
    });

Book.hasMany(Favorite, { foreignKey: "bookId" })
Favorite.belongsTo(Book, { foreignKey: "bookId" })

User.hasMany(Favorite, { foreignKey: "userId" })
Favorite.belongsTo(User, { foreignKey: "userId" })

module.exports = Favorite;
