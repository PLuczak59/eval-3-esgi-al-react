const {bdd} = require('./connexion.js');
const {DataTypes} = require('sequelize');

const User = bdd.define('user',{
  email:{
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  nickname: {
    type: DataTypes.STRING
  },
  // image: {
  //   type: DataTypes.STRING,
  //   defaultValue: ''
  // },
});

module.exports = User;