const express = require('express');
const postController = require("./../controller/post.controller.js");
const auth = require('../middleware/auth.middleware.js');
const multer = require('./../middleware/multer.middleware.js');

const router = express.Router();

router.get("/",auth,postController.getAll);
router.get("/:id",auth,postController.getById);
router.get("/page/:page",auth,postController.getPage);
router.post("/",multer,auth,postController.create);
router.put("/:id",multer,auth,postController.update);
router.delete("/:id",auth,postController.remove);

module.exports = router;