const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const {createPost, getAllPosts, getPostById, updatePost, deletePost, getPostByKeyword} = require("../controllers/postController");

const router = express.Router();

router.get("/",  getAllPosts);
router.get("/search", getPostByKeyword);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);


module.exports = router;