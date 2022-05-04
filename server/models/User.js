const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { childSchemas } = require('./Comment');

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
        image: {

        },
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
        ],
        isArtist: {
            type: Boolean,
            default: false
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
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