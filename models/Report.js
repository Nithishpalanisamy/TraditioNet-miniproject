const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to the post
    topic: String,
    username: String,
    email: String,
    photo: String,
    paragraph: String,
    reason: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now } // Timestamp of when the report was created
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
