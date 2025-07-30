const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");


const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        const user = await User.findById(userId)
        const like = await Like.create({
            post: postId,
            postTitle: post.title,
            user: req.user._id,
            username: user.username
        });
        // Add to post.likes
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: userId } // prevent duplicates
        });
        return res.status(201).json({message: `Liked the post: `, like});
    } catch(error) {
        if(error.code === 11000) {
            return res.status(400).json({message: "Already liked this post!"});
        }
        return res.status(500).json({message: `Failed to like post: ${error.message}`});
    }
};

const unlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;
        const deleted = await Like.findOneAndDelete({
            post: postId, 
            user: userId
        });
        if(!deleted) return res.status(404).json({message: "Like Not Found!"});
        // Remove userId from Post.likes array
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: userId }
        });
        return res.json({message: "Post unliked successfully"});
    } catch (error) {
        return res.status(500).json({message: `Failed to unlike the post: ${error.message}`});
    }
};

const getLikesCount = async (req, res) => {
    try {
        const postId = req.params.postId;
        const count = await Like.countDocuments({post: postId});
        return res.json({postId, likes: count})
    } catch (error) {
        return res.status(500).json({message: `Error while fetching ${error}`});
    }
};

module.exports = {likePost, unlikePost, getLikesCount};