const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); // Import the Report model
const Post = require('../models/Post'); // Import the Post model

// Route to report a post
router.post('/report', async (req, res) => {
    const { postId, reason } = req.body; // Get postId and reason from the request

    // Validate that postId and reason are provided
    if (!postId || !reason) {
        return res.status(400).send('Post ID and reason are required.');
    }

    try {
        // Find the post to retrieve its details
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found.');
        }

        // Create a new report using post details
        const report = new Report({
            postId,
            topic: post.topic,
            username: post.username,
            email: post.email,
            photo: post.photo,
            paragraph: post.paragraph,
            reason,
        });

        await report.save(); // Save the report to the database
        res.status(200).send('Post reported successfully.');
    } catch (error) {
        console.error("Error saving report:", error);
        res.status(500).send('Internal server error.');
    }
});

// Route to render the reported posts
router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find().populate('postId'); // Fetch all reports and populate postId
        res.render('admin/reports', { reports }); // Render reports.ejs with the fetched reports
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error.');
    }
});

// Route to delete a report (optional)
router.delete('/report/:id', async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id); // Delete the report by ID
        res.status(200).send('Report deleted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error.');
    }
});

// Export the router
module.exports = router;
