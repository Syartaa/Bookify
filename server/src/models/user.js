const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");
const { DataTypes } = Sequelize; 

const User = sequelize.define('user',{
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    },
    name:Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'), // You can add more roles if needed
        defaultValue: 'user' // Default to 'user' role
      },
})

module.exports = User;