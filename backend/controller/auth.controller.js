const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signin = async (req, res, next) => {
    let hash = bcrypt.hashSync(req.body.password, 10)
    try {
        let user = await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hash
        })
        return res.status(201).json({ message: "Utilisateur créé" });

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({where:{ email: req.body.email }});
        if (!user) {
            return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
        }
        return res.status(200).json({
            email: user.email,
            id: user.id,
            username: user.nickname,
            jwt: jwt.sign({
                email: user.email,
                id: user.id
            }, process.env.JWT_TOKEN)
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}