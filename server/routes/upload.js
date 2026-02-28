const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const Image = require('../models/Image');
const User = require('../models/User');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = process.env.UPLOAD_DIR || 'uploads/';
        console.log('Multer saving to:', uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Keeping original filename as requested by user
        cb(null, file.originalname);
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
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter,
});

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private
router.post('/', auth, upload.array('images', 20), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one image' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const totalSize = req.files.reduce((acc, file) => acc + file.size, 0);

        // Storage limit check (1GB for now)
        const MAX_STORAGE = 1024 * 1024 * 1024;
        if (user.storageUsed + totalSize > MAX_STORAGE) {
            return res.status(400).json({ message: 'Storage limit exceeded. Please upgrade to Pro.' });
        }

        const baseUrl = (process.env.BASE_URL || 'http://localhost:5001').replace(/\/$/, '');
        // We use /api/uploads if on production to match common Nginx proxy patterns
        const pathPrefix = baseUrl.includes('localhost') ? '/uploads' : '/api/uploads';
        const savedImages = [];

        for (const file of req.files) {
            const publicUrl = `${baseUrl}${pathPrefix}/${file.filename}`;

            const newImage = new Image({
                userId: req.user.userId,
                fileName: file.filename,
                originalName: file.originalname,
                size: file.size,
                url: publicUrl,
            });

            const savedImage = await newImage.save();
            savedImages.push(savedImage);
        }

        // Update user storage
        user.storageUsed += totalSize;
        await user.save();

        res.status(201).json(savedImages);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during upload' });
    }
});

module.exports = router;
