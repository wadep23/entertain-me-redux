const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const postSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatDate(timestamp)
        },
        postText: {
            type: String,
            required: true
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;