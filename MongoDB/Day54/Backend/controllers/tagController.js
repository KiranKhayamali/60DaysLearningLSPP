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



module.exports = {getPostByTag};