const Comment = require("../models/Comment");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");

exports.get_comments = async (req, res, next) => {
  try {
    const comments = await Comment.find({});
    const postComments = comments.filter(
      (comment) => comment.post == req.params.postid
    );
    if (postComments.length === 0) {
      return res.status(404).json({ msg: "No comments" });
    }
    res.status(200).json({ postComments });
  } catch (err) {
    next(err);
  }
};

exports.create_comment = [
  body("text", "Empty text").trim().escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    const comment = new Comment({
      text: req.body.text,
      user: req.user,
      post: req.params.postid,
    });
    await Post.findByIdAndUpdate(
      req.params.postid,
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    );
    comment.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: "comment saved", comment });
    });
  },
];
exports.update_comment = [
  body("text", "empty text").trim().escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    const comment = await Comment.findByIdAndUpdate(req.params.commentid, {
      text: req.body.text,
    });
    if (!comment) {
      return res.status(404).json({ msg: "comment not found" });
    }
    res.status(200).json({ msg: "update successful" });
  },
];

exports.delete_comment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentid);
    if (!comment) {
      return res.status(404).json({ msg: "comment not found" });
    }
    res.status(200).json({ msg: "comment deleted" });
  } catch (err) {
    return next(err);
  }
};
