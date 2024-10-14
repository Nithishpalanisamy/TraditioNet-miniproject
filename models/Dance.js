const mongoose = require('mongoose');

// Define the schema for the Dance model
const danceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    origin: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true } // URL for the dance image
});

// Create the model and specify the collection name
const Dance = mongoose.model('Dance', danceSchema, 'traditionalDances');

module.exports = Dance;
