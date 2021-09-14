const express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

router.post("/signup", userController.signup);
