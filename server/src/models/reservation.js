const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");
const Book = require("./book");

const { DataTypes } = Sequelize; 

const Reservation = sequelize.define("reservation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },


  reservationDate: Sequelize.DATE,

  status: {
    type: DataTypes.ENUM('active', 'fulfilled','cancelled'), // You can add more roles if needed
    defaultValue: 'active' // Default to 'available' role
  },

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
Book.hasMany(Reservation, { foreignKey: "bookId" });
Reservation.belongsTo(Book, { foreignKey: "bookId" });

User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

module.exports = Reservation;
