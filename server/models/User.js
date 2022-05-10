const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true, 
            minlength: 8
        },
        bio: {
            type: String
        },
        isArtist: {
            type: Boolean,
            default: false
        },
        image: {
            type: String
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        likes: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Post'
            }
        ],
        saves: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Post'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// set up pre-save middleware to create a password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;