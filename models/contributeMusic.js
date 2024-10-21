const mongoose = require('mongoose');

const contributeMusicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true } // To store image URL
});

module.exports = mongoose.model('contributeMusic', contributeMusicSchema);
