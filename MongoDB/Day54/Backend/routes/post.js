const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {createPost, getAllPosts} = require("../controllers/postController");

const router = express.Router();

router.get("/",  getAllPosts);
router.post("/", protect, createPost);

module.exports = router;