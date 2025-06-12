const express = require('express');
const authController = require("./../controller/auth.controller.js");

const router = express.Router();

router.post("/signin",authController.signin);
router.post("/login",authController.login);

module.exports = router;