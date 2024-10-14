const express = require('express');
const router = express.Router();
const Heritage = require('../models/Heritage'); // Import the Heritage model

// Route to fetch all heritage sites or search by name
router.get('/', async (req, res) => {
    try {
        const searchQuery = req.query.search || ''; // Get search query from the URL parameter
        let heritageSites;
        
        if (searchQuery) {
            heritageSites = await Heritage.find({ name: { $regex: `^${searchQuery}`, $options: 'i' } }); // Case-insensitive search starting with the input
        } else {
            heritageSites = await Heritage.find(); // Fetch all sites if no search query
        }
        
        res.render('heritage', { heritageSites, searchQuery }); // Pass search query back to the view
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching heritage sites');
    }
});

router.get('/searchHeritage', async (req, res) => {
    const query = req.query.q || '';
    try {
        const filteredHeritage = await Heritage.find({
            siteName: { $regex: new RegExp(`^${query}`, 'i') } // Case-insensitive search starting with query
        });
        res.json(filteredHeritage);
    } catch (error) {
        console.error('Error fetching filtered heritage sites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
