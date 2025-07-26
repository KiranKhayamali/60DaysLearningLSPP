const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const { createComment, deleteComment, getCommentForPost } = require("../controllers/commentController");

const router = express.Router();

router.post("/:postId", protect, createComment);
router.delete("/:commentId", protect, deleteComment);
router.get("/posts/:postId", protect, getCommentForPost);



module.exports = router;