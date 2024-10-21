const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, 
    topic: String,
    username: String,
    email: String,
    photo: String,
    paragraph: String,
    reason: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now }, 
    reportCount: { type: Number, default: 1 }, 
    reportedBy: { type: [String], default: [] } 
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
