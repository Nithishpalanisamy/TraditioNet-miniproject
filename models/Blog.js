const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username: String,
    useremail: String,
    blogheading: String,
    image: String,
    message: String
});

module.exports = mongoose.model('Blog', blogSchema);
