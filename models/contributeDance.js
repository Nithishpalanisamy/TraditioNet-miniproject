const mongoose = require('mongoose');

const contributeDanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Solo or Group
    origin: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true } // To store image URL
});

module.exports = mongoose.model('contributeDance', contributeDanceSchema);
