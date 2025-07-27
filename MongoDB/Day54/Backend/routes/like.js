const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {likePost} = require("../controllers/likeController");

const router = express.Router();

router.post("/:postId", protect, likePost);


module.exports = router; 