const {bdd} = require('./connexion.js');
const {DataTypes} = require('sequelize');

const Emoticon = bdd.define('emoticon',{
  type:{
    type: DataTypes.STRING
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'posts',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});

module.exports = Emoticon;