const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const Cateogory = sequelize.define('category',{
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name:Sequelize.STRING,
    description: Sequelize.STRING,
    
})

module.exports = Cateogory;