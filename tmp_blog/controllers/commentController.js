// import Comment from '../models/commentModel.js';
const Comment = require("../models/commentModel");

exports.newComment = async (req, res) => {
  try {
    const { name, postId, date, comments } = req.body;
    if (!name|| !postId || !date || !comments) {
      console.log("kuch to nahi hai");
      console.log(name);
      console.log(postId);
      console.log(date);
      console.log(comments);
      return res.status(400).send({
        message: "please fill all the field",
        success: false,
      });
    }
    const comment = new Comment({ name, postId, date, comments });
    await comment.save();
    // res.status(200).json('Comment saved successfully');
    return res.status(200).send({
      success: true,
      message: "comment saved successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "not added new comment",
      error,
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).sort({
      date: -1,
    });
    return res.status(200).send({
      success: true,
      message: "All comments",
      comments,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "not added new comment",
      error,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.params.id });
    await comment.delete();
    return res.status(200).send({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "not deleted comment",
      error,
    });
  }
};
