const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: '',
    },
    interests: {
        type: String,
        default: '',
    },
    userphoto: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
