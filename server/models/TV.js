const { Schema } = require('mongoose');

// Subdocument schema
const tvShowSchema = new Schema(
    {
        tvShowId: {
            type: String,
            required: true
        },
        tvShowName: {
            type: String,
            required: true
        },
        tvShowPoster: {
            type: String
        },
        tvShowDetails: {
            type: String,
            required: true
        },
        tvShowRating: {
            type: String
        }        
    }
);

module.exports = tvShowSchema;