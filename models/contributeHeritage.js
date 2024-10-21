const mongoose = require('mongoose');

const contributeHeritageSchema = new mongoose.Schema({
    location: { type: String, required: true },
    typeOfHeritage: { type: String, required: true },
    historicalSignificance: { type: String, required: true },
    architecturalStyle: { type: String, required: true },
    condition: { type: String, required: true },
    ownership: { type: String, required: true },
    conservationEfforts: { type: String, required: true },
    threats: { type: String, required: true },
    communityInvolvement: { type: String, required: true },
});

module.exports = mongoose.model('contributeHeritage', contributeHeritageSchema);
