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
    }
};


module.exports = {createComment};