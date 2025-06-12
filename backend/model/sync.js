const { bdd } = require('./connexion.js');
const User = require('./user.model.js');
const Post = require('./post.model.js');
const Emoticon = require('./emoticon.model.js');

const sync = async () => {
    User.hasMany(Post,{foreignKey: 'authorId'});
    Post.hasMany(Emoticon);
    User.hasMany(Emoticon);
    await bdd.sync({ force: true });
}

module.exports = sync;