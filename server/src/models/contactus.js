const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = require("../util/database");

const Contact = sequelize.define("contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Contact;
