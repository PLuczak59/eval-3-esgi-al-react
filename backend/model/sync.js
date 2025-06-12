const { bdd } = require('./connexion.js');
const User = require('./user.model.js');
const Post = require('./post.model.js');
const Emoticon = require('./emoticon.model.js');

const sync = async () => {
    
User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

Post.hasMany(Emoticon, { foreignKey: 'postId' });
Emoticon.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Emoticon, { foreignKey: 'userId' });
Emoticon.belongsTo(User, { foreignKey: 'userId' });


await bdd.sync({ force: true });
}

module.exports = sync;