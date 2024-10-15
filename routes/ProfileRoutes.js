const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

// Configure Multer storage for profile photos
const storage = multer.diskStorage({
    destination: './public/uploads/', // Upload directory for profile photos
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware to ensure a profile exists or create a new one
const ensureProfileExists = async (req, res, next) => {
    try {
        const userEmail = req.params.useremail; // Get user email from the URL
        console.log("Fetching user with email:", userEmail); // Debugging log
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            console.log("User not found");
            return res.status(404).send('User not found');
        }

        // Check if a profile already exists for the user
        let profile = await Profile.findOne({ userId: user._id }); // Use userId to find the profile

        // If no profile exists, create one with empty fields
        if (!profile) {
            profile = new Profile({
                userId: user._id, // Save the userId reference
                username: user.username,
                email: user.email,
                location: '',
                interests: '',
                userphoto: ''
            });
            await profile.save(); // Save the new profile document
            console.log("Created new profile for user:", user.username);
        } else {
            console.log("Profile found for user:", user.username);
        }

        req.profile = profile; // Store profile in the request object
        next();
    } catch (err) {
        console.error('Error in ensureProfileExists middleware:', err);
        return res.status(500).send('Server error');
    }
};

// Route to get the profile page
router.get('/:useremail', ensureProfileExists, async (req, res) => {
    const { username, email, location, interests, userphoto } = req.profile;

    try {
        const posts = await Post.find({ email });

        res.render('profile', {
            username,
            email,
            location,
            interests,
            userphoto,
            posts // Pass the posts to the template
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Server error');
    }
});

// Route to handle profile edits
router.post('/:useremail/edit', ensureProfileExists, upload.single('userphoto'), async (req, res) => {
    try {
        console.log("Updating profile for user:", req.params.useremail); // Debugging log
        console.log("Profile data received:", req.body); // Debugging log

        const updatedData = {
            location: req.body.location,
            interests: req.body.interests,
        };

        if (req.file) {
            updatedData.userphoto = '/uploads/' + req.file.filename;
        }

        await Profile.findOneAndUpdate(
            { userId: req.profile.userId }, // Use userId for the update
            { $set: updatedData },
            { new: true }
        );

        res.redirect(`/profile/${req.params.useremail}`);
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).send('Server error');
    }
});

// Route to get profile data (JSON) based on email
router.get('/json/:useremail', async (req, res) => {
    try {
        const userEmail = req.params.useremail;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const profile = await Profile.findOne({ userId: user._id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get posts by user email
router.get('/posts', async (req, res) => {
    const email = req.query.email;
    try {
        const posts = await Post.find({ email });
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get posts by user email along with photos
router.get('/posts-with-photos', async (req, res) => {
    const email = req.query.email;
    try {
        const posts = await Post.find({ email }).select('topic paragraph photo');
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts with photos:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
