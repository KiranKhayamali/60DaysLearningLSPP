const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const { createComment, deleteComment } = require("../controllers/commentController");

const router = express.Router();

router.post("/:postId", protect, createComment);
router.delete("/:postId", protect, deleteComment);



module.exports = router;