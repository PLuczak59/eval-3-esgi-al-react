const Emoticon = require("../model/emoticon.model.js");
const Post = require("../model/post.model.js");

const emoticonType = ["like","dislike","love"];

exports.add = async (req,res) => {
    if(!req.body.emoticon){
        return res.status(400).json({error: "Un emoticon doit être sélectionné"});
    }
    if(!emoticonType.includes(req.body.emoticon)){
        return res.status(400).json({error: "Un emoticon doit être sélectionné parmis ceux proposés"});
    }
    if(!req.body.postId){
        return res.status(400).json({error: "Un emoticon doit être associé à un post"});
    }
    let post = await Post.findOne({where: {id: req.body.postId}});
    if(!post){
        return res.status(400).json({error: "Un emoticon doit être associé à un post"});
    }
    if(post.authorId === req.token.id){
        return res.status(400).json({error: "Vous ne pouvez pas ajouter d'emoticon à vos propre post"});
    }
    let emoticon = await Emoticon.create({
        type: req.body.emoticon,
        postId: req.body.postId,
        userId: req.token.id
    });
    res.status(201).json(emoticon);
}

exports.remove = async (req,res) => {
    let emoticon = await Emoticon.findOne({where:{id: req.params.id}});
    if(emoticon.userId !== req.token.id){
        return res.status(400).json({error: "Vous ne pouvez pas retirer un emoticon que vous n'avez pas ajouté"});
    }
    let result = await Emoticon.destroy({where: {id: req.params.id}})
    res.status(200).json(result);
}