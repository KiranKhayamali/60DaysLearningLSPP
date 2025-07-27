const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {likePost, unlikePost, getLikesCount} = require("../controllers/likeController");

const router = express.Router();

router.post("/:postId", protect, likePost);
router.delete("/:postId", protect, unlikePost);
router.get("/:postId", protect, getLikesCount);


module.exports = router; 