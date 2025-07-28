const Post = require("../models/Post");

const getPostByTag = async (req, res) => {
    try {
        const tag = req.params.tag.toLowerCase();
        const post = await Post.find({ tags: tag}).populate("author", "username");
        return res.json(post);
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch post by tag", error});
    };
};

const getPostByMultipleTags = async (req, res) => {
    try {
        const tags = req.query.tags?.split(",").map(tag => tag.trim().toLowerCase());
        if(!tags||tags.length === 0) return res.status(404).json({message: "Tags Not Found!"});

        const posts = await Post.find({tags: {$in: tags}}).populate("author", "username").sort({created_at: -1});
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch post by multiple tags", error});
    };
};

module.exports = {getPostByTag, getPostByMultipleTags};