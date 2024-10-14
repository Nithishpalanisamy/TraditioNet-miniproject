const express = require('express');
const admin = require('firebase-admin');
const multer = require('multer');
const router = express.Router();

// Firebase Storage and Firestore initialization
admin.initializeApp({
    credential: admin.credential.cert(require('../config/traditionet-bd3be-firebase-adminsdk-v6y0u-867fec269c.json')),
    storageBucket: "traditionet-bd3be.appspot.com"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Multer configuration for in-memory file uploads
const upload = multer({
    storage: multer.memoryStorage()
});

// Route to display form for uploading music/dance data
router.get('/music-dance', (req, res) => {
    res.render('music-dance-form'); // Create this EJS form separately
});

// Route to handle form submission for music/dance data
router.post('/music-dance', upload.single('photo'), async (req, res) => {
    try {
        const file = req.file;
        const description = req.body.description;
        const category = req.body.category; // Music or Dance

        if (!file || !description || !category) {
            return res.status(400).send('Missing required fields');
        }

        // Upload photo to Firebase Storage
        const blob = bucket.file(Date.now() + '-' + file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (err) => {
            console.log(err);
            res.status(500).send('Error uploading file');
        });

        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Save music/dance data to Firestore
            await db.collection('music-dance').add({
                category: category,
                description: description,
                imageUrl: publicUrl,
                createdAt: new Date()
            });

            res.send('Music/Dance data uploaded successfully');
        });

        blobStream.end(file.buffer);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error saving music/dance data');
    }
});

module.exports = router;
