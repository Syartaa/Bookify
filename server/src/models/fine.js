const Sequelize = require("sequelize");
const { DataTypes } = Sequelize; // Ensure DataTypes is imported
const sequelize = require("../util/database");
const User = require("./user");
const Loan = require("./loan");

const Fine = sequelize.define("fine", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  amount: {
    type: Sequelize.DECIMAL(10, 2), // Use DECIMAL for currency
    allowNull: false, // Ensure amount is always specified
  },

  paymentStatus: {
    type: DataTypes.ENUM('paid', 'unpaid'), // Status options
    defaultValue: 'unpaid', // Default status
    allowNull: false,
  },

  loanId: {
    type: Sequelize.INTEGER,
    references: {
      model: Loan,
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
Loan.hasMany(Fine, { foreignKey: "loanId" });
Fine.belongsTo(Loan, { foreignKey: "loanId" });

User.hasMany(Fine, { foreignKey: "userId" });
Fine.belongsTo(User, { foreignKey: "userId" });

module.exports = Fine;
