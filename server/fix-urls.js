const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Image = require('./models/Image');

dotenv.config();

const fixUrls = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const images = await Image.find({});
        console.log(`Found ${images.length} images to check.`);

        let updatedCount = 0;
        for (const img of images) {
            if (img.url && img.url.includes('/uploads/') && !img.url.includes('/api/uploads/')) {
                const oldUrl = img.url;
                img.url = oldUrl.replace('/uploads/', '/api/uploads/');
                await img.save();
                console.log(`Updated: ${oldUrl} -> ${img.url}`);
                updatedCount++;
            }
        }

        console.log(`Successfully updated ${updatedCount} image URLs.`);
        process.exit(0);
    } catch (err) {
        console.error('Error fixing URLs:', err);
        process.exit(1);
    }
};

fixUrls();
