const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['free', 'pro', 'business'],
        default: 'free',
    },
    plan: {
        type: String,
        default: 'free',
    },
    storageUsed: {
        type: Number,
        default: 0, // In bytes
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
