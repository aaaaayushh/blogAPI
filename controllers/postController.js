const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");

exports.create_post = [
  body("title", "Empty title").trim().escape(),
  body("body", "empty body").trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }

    console.log(req.body);
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      author: req.user,
    });
    post.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: "post sent" });
    });
  },
];
exports.get_posts = async (req, res, next) => {};
exports.get_single_post = async (req, res, next) => {};
