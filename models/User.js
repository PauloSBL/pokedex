const { DataTypes } = require('sequelize');
const conn = require('./conn');
const Pokemon = require('./Pokemon');

const User = conn.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
        require:true
    },
    senha: {
        type: DataTypes.STRING,
        require:true
    },
    admin: {
        type:DataTypes.BOOLEAN
    }
});

module.exports = User