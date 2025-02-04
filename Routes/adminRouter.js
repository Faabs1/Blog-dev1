const express = require("express");

const userMiddleware = require("../Middleware/jwt");
const { disableUser } = require("../Controller/adminController");

const router = express.Router();

router.put("/disable/:id", userMiddleware, disableUser);

module.exports = router;
