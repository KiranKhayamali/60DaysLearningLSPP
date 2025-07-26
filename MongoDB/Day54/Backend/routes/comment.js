const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const { createComment } = require("../controllers/commentController");

const router = express.Router();

router.post("/:postId", protect, createComment);


module.exports = router;