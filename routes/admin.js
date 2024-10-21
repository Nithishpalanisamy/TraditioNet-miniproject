const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Post = require('../models/Post');

// Middleware to parse JSON bodies
router.use(express.json());

// Route to report a post
router.post('/report', async (req, res) => {
    try {
        const { postId, reason } = req.body;

        if (!postId || !reason) {
            return res.status(400).json({ error: 'Post ID and reason are required.' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        const newReport = new Report({
            postId,
            topic: post.topic,
            username: post.username,
            email: post.email,
            photo: post.photo,
            paragraph: post.paragraph,
            reason
        });

        await newReport.save();
        res.status(200).json({ message: 'Post reported successfully.' });
    } catch (error) {
        console.error('Error reporting post:', error);
        res.status(500).json({ error: 'Failed to report post.' });
    }
});

// Route to render the reported posts
router.get('/report', async (req, res) => {
    try {
        const reports = await Report.find().populate('postId');
        res.render('admin/reports', { reports });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error.');
    }
});

// Route to delete a report and the associated post
router.post('/report/delete/:id', async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({ error: 'Report not found.' });
        }

        await Post.findByIdAndDelete(report.postId);
        await Report.findByIdAndDelete(reportId);

        res.status(200).json({ message: 'Report and associated post deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete report and post.' });
    }
});

// Route to ignore a report
router.post('/report/ignore/:id', async (req, res) => {
    try {
        const reportId = req.params.id;
        await Report.findByIdAndDelete(reportId);

        res.status(200).json({ message: 'Report ignored successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to ignore report.' });
    }
});

module.exports = router;
