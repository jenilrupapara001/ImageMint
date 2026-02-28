const express = require('express');
const auth = require('../middleware/auth');
const Image = require('../models/Image');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const router = express.Router();

// @route   GET /api/images
// @desc    Get all images for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const images = await Image.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching images' });
    }
});

// @route   DELETE /api/images/:id
// @desc    Delete an image
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Check ownership
        if (image.userId.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Delete file from storage
        const filePath = path.join(__dirname, '../uploads', image.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Update user storage
        const user = await User.findById(req.user.userId);
        if (user) {
            user.storageUsed = Math.max(0, user.storageUsed - image.size);
            await user.save();
        }

        await image.deleteOne();

        res.json({ message: 'Image removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during deletion' });
    }
});

// @route   GET /api/images/export
// @desc    Export image links to Excel
// @access  Private
router.get('/export', auth, async (req, res) => {
    try {
        const images = await Image.find({ userId: req.user.userId }).sort({ createdAt: -1 });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('My Image Links');

        worksheet.columns = [
            { header: 'Image Name', key: 'name', width: 40 },
            { header: 'Public URL', key: 'url', width: 70 },
            { header: 'Size (KB)', key: 'size', width: 15 },
            { header: 'Created At', key: 'createdAt', width: 25 },
        ];

        images.forEach(img => {
            worksheet.addRow({
                name: img.originalName,
                url: img.url,
                size: (img.size / 1024).toFixed(2),
                createdAt: img.createdAt.toLocaleString(),
            });
        });

        // Styling the header
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'F2F2F2' }
        };

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'LinkPixel_Export.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {
        console.error('Export error:', err);
        res.status(500).json({ message: 'Server error during export' });
    }
});

module.exports = router;
