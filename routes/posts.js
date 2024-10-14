const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post'); // Assuming you create this model

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});

const upload = multer({ storage: storage });

// Home route - Fetch and render posts
router.get('/', (req, res) => {
    Post.find().then(posts => {
        res.render('index', { posts });
    }).catch(err => {
        console.log(err);
        res.status(500).send('An error occurred while fetching posts.');
    });
});

// Post page route
router.get('/post', (req, res) => {
    res.render('post');
});

// Handle post submissions with file upload
router.post('/post', upload.single('photo'), (req, res) => {
    const newPost = new Post({
        topic: req.body.topic,
        username: req.body.username,
        email: req.body.email,
        photo: req.file ? '/uploads/' + req.file.filename : '', // Store the path to the uploaded file
        paragraph: req.body.paragraph
    });
    newPost.save().then(() => res.redirect('/')).catch(err => {
        console.log(err);
        res.status(500).send('An error occurred while saving the post.');
    });
});

// API route for fetching more posts (optional for infinite scroll)
router.get('/api/posts', (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 2;
    Post.find().skip(offset).limit(limit).then(posts => {
        res.json(posts);
    });
});

module.exports = router;
