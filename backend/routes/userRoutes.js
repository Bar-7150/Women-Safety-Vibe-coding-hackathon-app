const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Get User by Email
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update SOS Contacts
router.put('/:email/contacts', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.sosContacts.push(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload SOS Recording
router.post('/sos/upload', upload.single('video'), async (req, res) => {
    try {
        const { email, lat, lng } = req.body;
        const videoUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.sosEvents.push({
            timestamp: new Date(),
            location: { lat, lng },
            videoUrl
        });

        await user.save();
        res.status(200).json({ message: 'SOS Event Recorded', videoUrl });
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
