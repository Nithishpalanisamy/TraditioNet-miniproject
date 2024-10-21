const express = require('express');
const router = express.Router();
const ContributeMusic = require('../models/contributeMusic'); // Corrected path
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to handle music contribution submission
router.post('/', upload.single('image'), (req, res) => {
    const newMusicContribution = new ContributeMusic({
        name: req.body.name,
        region: req.body.region,
        description: req.body.description,
        imageUrl: req.file ? '/uploads/' + req.file.filename : '' // Save the relative path
    });

    newMusicContribution.save()
        .then(() => res.json({ message: 'Music contribution saved successfully' }))
        .catch(err => res.status(400).json({ message: 'Error saving contribution: ' + err }));
});

module.exports = router;
