const { Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = commentSchema;