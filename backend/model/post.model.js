const {bdd} = require('./connexion.js');
const {DataTypes} = require('sequelize');

const Post = bdd.define('post',{
  message:{
    type: DataTypes.STRING
  },
  picture: {
    type: DataTypes.STRING
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

module.exports = Post;