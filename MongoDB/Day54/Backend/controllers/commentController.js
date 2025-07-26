const Comment = require("../models/Comment");

const createComment = async (req, res) => {
    try {
        const {content} = req.body;
        const {postId} = req.params;
        const comment = await Comment.create( {
            post: postId,
            user: req.user._id,
            content,
        });

        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({message: `Failed to add comment: ${error}`});
    };
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({message: "Comment Not Found!"});
        if(comment.user.toString() !== req.user._id.toString()) 
            return res.status(403).json({message: "Not authorized to delete this comment!"});

        await comment.remove();
        return res.json({message: "Comment Sucessfully deleted"});
    } catch (error) {
        return res.status(500).json({message: "Failed to delete comment!"});
    };
};

const getCommentForPost = async (req, res) => {
    try {
        const comments = await Comment.find({post: req.params.postId}).populate("user", "username").sort({created_at: -1});
        return res.json(comments);
    } catch (error) {
        return res.status(500).json({message: `Failed to Fetch comment ${error}`});
    };
};

const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({message: "Comment Not Found!"});

        if(comment.user.toString() !== req.user._id.toString()) return res.status(403).json({message: "Not authorized to update comment"});
        const updatedComment = new Comment.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        return res.status(201).json(updatedComment);
    } catch (error) {
        return res.status(500).json({message: "Failed to update comment!"});
    }
}

module.exports = {createComment, deleteComment, getCommentForPost, updateComment};