const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const Author = sequelize.define('author',{
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name:Sequelize.STRING,
    bio: {
        type: Sequelize.TEXT('long'), // Use 'long' variant for larger text in MySQL
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING, // Use STRING to store the URL/path of the image
        allowNull: true, // Optional: Set to true if the image is not mandatory
      },
    
})

module.exports = Author;