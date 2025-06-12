const Post = require('../model/post.model.js');
const Emoticon = require("../model/emoticon.model.js");
const fs = require('fs');

const getAll = async (req, res, next) => {
    let result = await Post.findAll({include: [{model: Emoticon}]});
     res.status(200).json(result);
}

const getPage = async (req,res) => {
    if(!req.params.page){
        return res.status(400).json({error: "Vous devez sélectionner une page"});
    }
    let result = await Post.findAll({include: [{model: Emoticon}],limit:5,offset:(req.params.page-1)*5});
     res.status(200).json(result);
}


const getById = async (req, res, next) => {
    let result = await Post.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(result);
}

const create = async (req, res, next) => {
    let body = JSON.parse(req.body.post);
    let post = {
        message : body.message,
        authorId: req.token.id
    }
    if(req.file){
        post.picture = req.file.filename;
    }
    try {
        let result = await Post.create(post);
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const update = async (req, res, next) => {
    
    let post = await Post.findOne({ where: { id: req.params.id } });
    if(post.authorId !== req.token.id){
        return res.status(401).json({message: "Vous n'avez pas les droits pour modifier ce post"})
    }
    if(req.file){
        fs.rmSync('./images/' + post.picture);
        post.picture = req.file.filename;
    }
    if(req.body && req.body.post){
        let body = JSON.parse(req.body.post);
        if(body.message){
            post.message = body.message;
        }
    }
    await post.save();
    res.status(200).json(post);
}

const remove = (req, res, next) => {
    let result = Post.destroy({ where: { id: req.params.id } });
    res.status(200).json(result);
}

module.exports = { getAll, create, getById, update, remove, getPage };