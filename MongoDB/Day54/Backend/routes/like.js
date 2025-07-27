const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {likePost, unlikePost} = require("../controllers/likeController");

const router = express.Router();

router.post("/:postId", protect, likePost);
router.delete("/:postId", protect, unlikePost);


module.exports = router; 