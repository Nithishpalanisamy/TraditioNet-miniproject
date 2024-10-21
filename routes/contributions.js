const express = require('express');
const router = express.Router();
const ContributeHeritage = require('../models/contributeHeritage');
const ContributeMusic = require('../models/contributeMusic');
const ContributeDance = require('../models/contributeDance');

// Route to fetch all contributions
router.get('/contributions', async (req, res) => {
    try {
        const contributeHeritages = await ContributeHeritage.find(); // Use a variable that matches what you will use in the EJS
        const contributeMusics = await ContributeMusic.find();
        const contributeDances = await ContributeDance.find();
        // Pass the variable names correctly to the view
        res.render('contributions', { contributeHeritages, contributeMusics, contributeDances });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contributions', error });
    }
});


module.exports = router;
