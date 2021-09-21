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
exports.get_posts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    if (!posts) {
      return res.status(404).json({ err: "posts not found" });
    }
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};
exports.get_single_post = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ err: `post with id ${req.params.id} not found` });
    }
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.update_post = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title,
      body,
    });
    if (!post) {
      return res.status(404).json({ msg: "update failed" });
    }
    res.status(200).json({ msg: "update successful" });
  } catch (err) {
    next(err);
  }
};

exports.delete_post = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ msg: "post not found" });
    }
    res.status(200).json({ msg: "post deleted" });
  } catch (err) {
    next(err);
  }
};
