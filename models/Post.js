const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic: String,
    username: String,
    email: String,
    photo: String, 
    paragraph: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
