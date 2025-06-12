const {bdd} = require('./connexion.js');
const {DataTypes} = require('sequelize');

const Post = bdd.define('post',{
  message:{
    type: DataTypes.STRING
  },
  picture: {
    type: DataTypes.STRING
  }
});

module.exports = Post;