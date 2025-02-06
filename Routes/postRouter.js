const express = require("express");


const userMiddleware = require("../Middleware/jwt");
const upload = require("../Middleware/multer");
const { createPost, getPostsByCategory } = require("../Controller/postController");


const router = express.Router();

router.post("/createPost", userMiddleware, upload.array("images", 15), createPost);
router.get("/:category", getPostsByCategory);

module.exports = router;
