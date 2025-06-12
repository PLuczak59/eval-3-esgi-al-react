const {bdd} = require('./connexion.js');
const {DataTypes} = require('sequelize');

const Emoticon = bdd.define('emoticon',{
  type:{
    type: DataTypes.STRING
  }
});

module.exports = Emoticon;