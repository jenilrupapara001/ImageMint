const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true, // In bytes
    },
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Image', imageSchema);
