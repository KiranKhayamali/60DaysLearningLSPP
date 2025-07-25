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

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username").sort({created_at: -1});
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({message: "Failed to fetch posts!"});
    };
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username");
        if(!post) return res.status(404).json({message: "Post Not Found!"});
        return res.json(post);
    } catch (error) {
        return res.status(500).json({message: "Error Fetching post!"});
    };
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: "Post Not Found!"});
        
        if(post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to update this post!"});
        };

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        console.log("testing");
        return res.json(updatePost);
    } catch (error) {
        return res.status(500).json({message: "Error Updating post!"});
    };
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: "Post Not Found!"});

        if(post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to delete the post!"});
        };

        console.log("testing");
        await Post.findByIdAndDelete(req.params.id);
        console.log("testing after remove");
        return res.json({message: "Post Deleted"});
    } catch (error) {
        return res.status(500).json({message: "Error Deleting post!", errors: error});
    };
};


module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost};