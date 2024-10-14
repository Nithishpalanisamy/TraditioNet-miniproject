const mongoose = require('mongoose');
const { Schema, model } = mongoose; // Destructure Schema and model from mongoose

// Define a schema for the music collection
const musicSchema = new Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

// Create a model for the music schema
const Music = model('Music', musicSchema, 'traditionalMusic');

module.exports = Music;
