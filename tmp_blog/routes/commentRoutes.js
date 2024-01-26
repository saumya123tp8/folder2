const express = require("express");
const {
  newComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

///comment related
router.post("/comment/new", newComment);
router.get("/comments/:id", getComments);
router.delete("/comment/delete/:id", deleteComment);

module.exports = router;
