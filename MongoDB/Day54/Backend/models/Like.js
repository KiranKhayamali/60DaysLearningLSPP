const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        postTitle: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
        }
    },
    {timestamps: true}
);

//Prevent dupicate likes
likeSchema.index({post: 1, user: 1}, {unique: true});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;