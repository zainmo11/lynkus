// this is the model
const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
    text: { type: String, required: true, unique: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hashtag', hashtagSchema);

