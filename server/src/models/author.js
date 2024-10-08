const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const Author = sequelize.define('author',{
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name:Sequelize.STRING,
    bio: Sequelize.STRING,
    
})

module.exports = Author;