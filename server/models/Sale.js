const { Schema, model } = require('mongoose');

const commentSchema = require('./Comment');

const saleSchema = new Schema(
    {
        image: {

        },
        title: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 80
        },
        description: {
            type: String, 
            required: true,
            minLength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            match: [/^[0-9]*\.[0-9]{2}$/, 'Must include 2 decimal places!']
        },
        sold: {
            type: Boolean,
            default: false
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

const Sale = model('Sale', saleSchema);

module.exports = Sale;