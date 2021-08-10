const { Schema } = require('mongoose');

const videoGameSchema = new Schema(
    {
        gameId: {
            type: String,
            required: true
        },
        gameName: {
            type: String,
            required: true
        },
        gamePoster: {
            type: String
        },
        gameRating: {
            type: String
        },
        gameDescription: {
            type: String
        }
    }
);

module.exports = videoGameSchema;