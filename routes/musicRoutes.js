const express = require('express');
const Musics = require('../models/Musics'); // Ensure the model is correctly named

const router = express.Router();

// Route to fetch and display all music data
router.get('/', async (_req, res) => {
    try {
        const musicList = await Musics.find(); // Fetch all music from the collection
        res.render('music', { musicList }); // Render the 'music.ejs' view and pass the musicList data
    } catch (error) {
        console.error('Error fetching music:', error);
        res.status(500).send('Internal Server Error'); // Send 500 status in case of server error
    }
});

// Route to handle music search queries (search by name)
router.get('/search', async (req, res) => {
    const query = req.query.q || ''; // Extract the search query from the URL or set default to empty string
    try {
        // Search for music documents where the 'name' field matches the query (case-insensitive)
        const filteredMusic = await Musics.find({ name: new RegExp(query, 'i') });
        res.json(filteredMusic); // Return the filtered music as a JSON response
    } catch (error) {
        console.error('Error fetching filtered music:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Send JSON error message if any issue occurs
    }
});

// Additional music routes can be added here

// Export the router for use in the main app.js file
module.exports = router;
