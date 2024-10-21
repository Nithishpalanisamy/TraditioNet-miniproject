const express = require('express');
const router = express.Router();
const ContributeHeritage = require('../models/contributeHeritage');

// Route to handle heritage contributions
router.post('/', async (req, res) => {
    try {
        const newContribution = new ContributeHeritage({
            location: req.body.location,
            typeOfHeritage: req.body.typeOfHeritage,
            historicalSignificance: req.body.historicalSignificance,
            architecturalStyle: req.body.architecturalStyle,
            condition: req.body.condition,
            ownership: req.body.ownership,
            conservationEfforts: req.body.conservationEfforts,
            threats: req.body.threats,
            communityInvolvement: req.body.communityInvolvement,
        });

        await newContribution.save();
        res.status(201).json({ message: 'Heritage contribution saved successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to save contribution.', details: error });
    }
});

module.exports = router;
