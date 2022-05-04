const { Schema, model } = require('mongoose');

const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        image: {

        },
        title: {
            type: String,
            maxlength: 80
        },
        description: {
            type: String, 
            maxlength: 280
        },
        username: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        likes: [
            {

            }
        ],
        comments: [commentSchema],
        saves: [
            {

            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;