const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");


const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        const user = await User.findById(req.user._id)
        const like = await Like.create({
            post: postId,
            postTitle: post.title,
            user: req.user._id,
            username: user.username
        });
        return res.status(201).json({message: `Liked the post: ${like}`});
    } catch(error) {
        if(error.code === 11000) {
            return res.status(400).json({message: "Already liked this post!"});
        }
        return res.status(500).json({message: `Failed to like post: ${error}`});
    }
};

module.exports = {likePost};