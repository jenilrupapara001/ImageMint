const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const Image = require('../models/Image');
const User = require('../models/User');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `${uuidv4()}${ext}`;
        cb(null, fileName);
    },
});

// File Filter (Images Only)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Only images (jpeg, png, webp) are allowed'));
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter,
});

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Storage limit check (500MB for free users)
        const MAX_STORAGE = 500 * 1024 * 1024;
        if (user.storageUsed + req.file.size > MAX_STORAGE) {
            return res.status(400).json({ message: 'Storage limit exceeded. Please upgrade to Pro.' });
        }

        const baseUrl = process.env.BASE_URL || 'http://localhost:5001';
        const publicUrl = `${baseUrl}/uploads/${req.file.filename}`;

        const newImage = new Image({
            userId: req.user.userId,
            fileName: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            url: publicUrl,
        });

        const savedImage = await newImage.save();

        // Update user storage
        user.storageUsed += req.file.size;
        await user.save();

        res.status(201).json(savedImage);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during upload' });
    }
});

module.exports = router;
