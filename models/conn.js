const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pokedex', 'root','',{
    host:'localhost',
    dialect: 'mysql',
})

module.exports = sequelize