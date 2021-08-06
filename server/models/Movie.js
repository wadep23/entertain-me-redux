const { Schema } = require('mongoose');

// Subdocument schema
const movieSchema = new Schema(
    {
        movieId: {
            type: String,
            required: true
        },
        movieName: {
            type: String,
            required: true
        },
        moviePoster: {
            type: String
        },
        movieDetails: {
            type: String,
            required: true
        },
        movieRating: {
            type: String
        } 
    }
);

module.exports = movieSchema;