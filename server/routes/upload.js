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

        console.log('Multer result:', {
            path: req.file.path,
            destination: req.file.destination,
            filename: req.file.filename
        });

        if (!fs.existsSync(req.file.path)) {
            console.error('CRITICAL: File not found on disk at', req.file.path);
            return res.status(500).json({ message: 'Error: File failed to save to disk' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Storage limit check (500MB for free users)
        const MAX_STORAGE = 1024 * 1024 * 1024;
        if (user.storageUsed + req.file.size > MAX_STORAGE) {
            return res.status(400).json({ message: 'Storage limit exceeded. Please upgrade to Pro.' });
        }

        const baseUrl = (process.env.BASE_URL || 'http://localhost:5001').replace(/\/$/, '');
        // We use /api/uploads if on production to match common Nginx proxy patterns
        const pathPrefix = baseUrl.includes('localhost') ? '/uploads' : '/api/uploads';
        const publicUrl = `${baseUrl}${pathPrefix}/${req.file.filename}`;

        console.log('Public URL constructed:', publicUrl);

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
