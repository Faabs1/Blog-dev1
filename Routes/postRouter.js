const express = require("express");

const { createPost, getPostsByCategory } = require("../Controller/postController");
const userMiddleware = require("../Middleware/jwt");
const upload = require("../Middleware/multer");


const router = express.Router();

router.post("/", userMiddleware, upload.array("images", 15), createPost);
router.get("/:category", getPostsByCategory);

module.exports = router;
