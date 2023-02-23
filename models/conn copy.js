const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bzkxobzzkbmyxa6gfrmy', 'umg39hwkyp1z1n0v','jQXFw0cQfN8gA8ZGeSSw',{
    host:'bzkxobzzkbmyxa6gfrmy-mysql.services.clever-cloud.com',
    dialect: 'mysql',
})

module.exports = sequelize