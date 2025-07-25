const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {createPost, getAllPosts, getPostById, updatePost} = require("../controllers/postController");

const router = express.Router();

router.get("/",  getAllPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.post("/:id", protect, updatePost);

module.exports = router;