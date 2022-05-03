const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const artistSchema = new Schema(
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
                ref: 'Artist'
            }
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        sales: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Sale'
            }
        ]
    }
);

// set up pre-save middleware to create a password
artistSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compate the incoming password with the hashed password
artistSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const Artist = model('Artist', artistSchema);

module.exports = Artist;