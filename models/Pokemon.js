const { DataTypes } = require('sequelize')
const conn = require('./conn')
const User = require('./User')

const Pokemon = conn.define('pokemon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idPokemon: {
    type: DataTypes.INTEGER,
    require:true
  },
    nome: {
      type: DataTypes.STRING,
      require:true
    },
    img: {
      type: DataTypes.STRING,
      require:true
    },
    spd: {
      type: DataTypes.STRING
    },
    atk: {
      type: DataTypes.STRING
    },
    def: {
      type: DataTypes.STRING
    },
    type1: {
      type: DataTypes.STRING
    },
    type2: {
      type: DataTypes.STRING
    },
    vantagens: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
  }
  });
  Pokemon.belongsTo(User);

  
module.exports = Pokemon