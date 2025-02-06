const express = require("express");
const { register, login } = require("../Controller/userController");
const upload = require('../Middleware/multer')

const router = express.Router();

router.post("/register",upload.single('image'), register);
router.post("/login", login);

module.exports = router;
