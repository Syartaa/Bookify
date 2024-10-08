const Sequelize = require("sequelize");
const { DataTypes } = Sequelize; // Ensure DataTypes is imported
const sequelize = require("../util/database");
const User = require("./user");
const Book = require("./book");

const Loan = sequelize.define("loan", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  borrowDate: {
    type: Sequelize.DATE,
    allowNull: false, // Make this required if a loan must have a borrow date
  },
  
  returnDate: {
    type: Sequelize.DATE,
    allowNull: true, // Nullable until the book is returned
  },
  
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false, // Make this required to ensure a due date is set
  },

  status: {
    type: DataTypes.ENUM('borrowed', 'returned', 'overdue'), // Status options
    defaultValue: 'borrowed', // Default status
  },

  bookId: {
    type: Sequelize.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
    allowNull: false, // Book must be specified for the loan
  },

  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false, // User must be specified for the loan
  },
});

// Correct associations
Book.hasMany(Loan, { foreignKey: "bookId" });
Loan.belongsTo(Book, { foreignKey: "bookId" });

User.hasMany(Loan, { foreignKey: "userId" });
Loan.belongsTo(User, { foreignKey: "userId" });

module.exports = Loan;
