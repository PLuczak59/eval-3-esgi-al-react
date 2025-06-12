const express = require('express');
const userController = require("./../controller/user.controller.js");
const auth = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get("/",auth,userController.getAll);

module.exports = router;