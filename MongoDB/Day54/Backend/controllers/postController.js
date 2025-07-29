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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page -1) * limit;
        const total = await Post.countDocuments();

        const posts = await Post.find().populate("author", "username").sort({created_at: -1}).skip(skip).limit(limit);
        return res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total/limit),
            totalPosts: total 
        });
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

const getPostByKeyword = async(req, res) => {
    try {
        const query = req.query.q;
        if(!query) return res.status(400).json({message: "Search query is requrired!"});

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page -1) * limit;
        const total = await Post.countDocuments();

        const regex = new RegExp(query, "i") //case-insensitive regex
        const posts = await Post.find({
            $or: [{title: regex}, {content: regex}],
        }).populate("author", "username").sort({created_at: -1}).skip(skip).limit(limit);
        return res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total/limit),
            totalPosts: total
        });
    } catch(error) {
        return res.status(500).json({message: "Error while fetching post with keyword", errors: error});
    };
};

const searchPostPaginated = async(req, res) => { //for searching post using both keyword and tags
    try{
        const {q, tags} = req.query;
        const regex = q && typeof query === 'string' ? new RegExp(query, "i") : null;
        const tagList = tags ? tags.split(",").map(tag => tag.trim().toLowerCase()) : [];
        const filter = {};
        if (regex) {
            filter.$or = [
                {title: regex},
                {content: regex},
            ];
        };
        
        if(tagList.length > 0) {
            filter.tags = {$in: tagList};
        };
        
        
        const posts = await Post.find(filter)
            .populate("author", "username")
            .sort({created_at: -1});

        return res.json({
            posts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total/limit),
            totalPosts: total
        });
    } catch (error) {
        return res.status(500).json({message: "Error while searching for post", errors: error});
    }
};

module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost, getPostByKeyword, searchPostPaginated};