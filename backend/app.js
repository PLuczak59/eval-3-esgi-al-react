const express = require("express");
const authRoute =require("./route/auth.route.js");
const userRoute =require("./route/user.route.js");
const postRoute =require("./route/post.route.js");
const emoticonRoute =require("./route/emoticon.route.js");
const {connect} = require('./model/connexion.js');
const sync = require('./model/sync.js');
const dataset = require("./model/dataset.js");
const app = express();
const cors = require('cors');

const database = async () => {
    await connect();
    await sync();
    await dataset();
}
database();

app.use(express.json());
app.use(cors());

app.use('/auth',authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/emoticon',emoticonRoute);

module.exports = app;