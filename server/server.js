const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Ensure uploads directory exists
const uploadsDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
console.log('Using upload directory:', uploadsDir);
if (!fs.existsSync(uploadsDir)) {
    console.log('Creating upload directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/images', require('./routes/images'));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'LinkPixel API is running' });
});

app.get('/api/diag', (req, res) => {
    try {
        const uploadsDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
        const exists = fs.existsSync(uploadsDir);
        let files = [];
        if (exists) {
            files = fs.readdirSync(uploadsDir);
        }
        res.json({
            uploadsDir,
            exists,
            files: files.slice(0, 50),
            env: {
                PORT: process.env.PORT,
                BASE_URL: process.env.BASE_URL,
                NODE_ENV: process.env.NODE_ENV
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
