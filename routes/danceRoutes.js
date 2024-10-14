// routes/danceRoutes.js

const express = require('express');
const router = express.Router();
const Dance = require('../models/Dance'); // Ensure the model is imported correctly

// Route to get the dance page
router.get('/', async (req, res) => {
    try {
        const dances = await Dance.find(); // Fetch the dance data from MongoDB
        res.render('dance', { dances }); // Render the dance.ejs view with the fetched data
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Export the router
module.exports = router;
