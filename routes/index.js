const express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");
const passport = require("passport");

//authentication
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

//get requests for posts
router.get("/", function (req, res, next) {
  res.redirect("/posts");
});
router.get("/posts", postController.get_posts);

//get request for single post
router.get("/posts/:id", postController.get_single_post);

//create post
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.create_post
);
//update post
router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  postController.update_post
);
router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  postController.delete_post
);
module.exports = router;
