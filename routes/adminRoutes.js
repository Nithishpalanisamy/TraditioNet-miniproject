const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Adjust this path according to your project structure

// Route to report a post
router.post('/report/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.findByIdAndUpdate(postId, { reported: true });
        res.status(200).send('Post reported');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Route to get reported posts for admin
router.get('/reported', async (req, res) => {
    try {
        const reportedPosts = await Post.find({ reported: true });
        res.render('admin/reportedPosts', { reportedPosts }); // Render the admin view with reported posts
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
