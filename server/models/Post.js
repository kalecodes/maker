const { Schema, model } = require('mongoose');

const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        image: {
            // implement image upload and storage
            type: String,
            required: true
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
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        forSale: {
            type: Boolean, 
            default: false,
            required: true
        },
        price: {
            type: Number,
            match: [/^[0-9]*\.[0-9]{2}$/, 'Must include 2 decimal places!']
        },
        sold: {
            type: Boolean, 
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        likedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [commentSchema],
        savedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtual: true,
            getters: true
        },
        id: false
    }
);

// get like count
postSchema.virtual('likeCount').get(function() {
    return this.likedBy.length;
})

// get comment count
postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
})

const Post = model('Post', postSchema);

module.exports = Post;