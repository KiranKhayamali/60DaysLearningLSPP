const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const { createComment, deleteComment, getCommentForPost, updateComment } = require("../controllers/commentController");

const router = express.Router();

router.post("/:postId", protect, createComment);
router.delete("/:commentId", protect, deleteComment);
router.get("/post/:postId", protect, getCommentForPost);
router.put("/post/:postId", protect, updateComment);



module.exports = router;