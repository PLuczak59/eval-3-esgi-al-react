const express = require('express');
const emoticonController = require("./../controller/emoticon.controller.js");
const auth = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post("/",auth,emoticonController.add);
router.delete("/:id",auth,emoticonController.remove);

module.exports = router;