const mongoose = require('mongoose');

// Define the schema for the Heritage model
const heritageSchema = new mongoose.Schema({
    siteName: { type: String, required: true },
    location: { type: String, required: true },
    typeOfHeritage: { type: String, required: true },
    historicalSignificance: { type: String, required: true },
    architecturalStyle: { type: String, required: true },
    condition: { type: String, required: true },
    ownership: { type: String, required: true },
    conservationEfforts: { type: String, required: true },
    threats: { type: String, required: true },
    communityInvolvement: { type: String, required: true }
});

// Create the model and specify the collection name
const Heritage = mongoose.model('Heritage', heritageSchema, 'heritageSites');

module.exports = Heritage;
