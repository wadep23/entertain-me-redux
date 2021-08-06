const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// These are subdocument schemas to save associated media to an array on User
const tvShowSchema = require('./TV');
const movieSchema = require('./Movie');

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please use a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        favoriteMovies: [movieSchema],
        favoriteTvShows: [tvShowSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// This is where we hash the user's password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 15;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// Validates password at login
userSchema.methods.correctPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;