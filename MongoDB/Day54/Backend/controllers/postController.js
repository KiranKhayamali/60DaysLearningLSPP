const Post = require("../models/Post");

const createPost = async (req, res) => {
    const {title, content, tags} = req.body;
    try {
        const newPost = await Post.create({
            title,
            content,
            tags,
            author: req.user._id,
        });
        return res.status(201).json(newPost);
    } catch(error) {
        return res.status(500).json({message: "Failed to create the post!"});
    };
};


module.exports = {createPost};