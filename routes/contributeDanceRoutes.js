const express = require('express');
const router = express.Router();
const ContributeDance = require('../models/contributeDance'); // Ensure you have this model created
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

// Route to handle dance contribution submission
router.post('/', upload.single('image'), (req, res) => {
    const newDanceContribution = new ContributeDance({
        name: req.body.name,
        type: req.body.type,
        origin: req.body.origin,
        description: req.body.description,
        imageUrl: req.file ? '/uploads/' + req.file.filename : '' // Save the relative path
    });

    newDanceContribution.save()
        .then(() => res.json({ message: 'Dance contribution saved successfully' }))
        .catch(err => res.status(400).json({ message: 'Error saving contribution: ' + err }));
});

module.exports = router;
