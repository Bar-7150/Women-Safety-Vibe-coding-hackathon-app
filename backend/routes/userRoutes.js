const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get User (Simulated by ID or simple fetch for demo)
// GET /api/users/:email
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create/Register User
// POST /api/users/register
router.post('/register', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ name, email, phone, sosContacts: [] });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add SOS Contact
// PUT /api/users/:email/contacts
router.put('/:email/contacts', async (req, res) => {
    const { name, phone, priority } = req.body;
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.sosContacts.push({ name, phone, priority });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete SOS Contact
// DELETE /api/users/:email/contacts/:contactId
router.delete('/:email/contacts/:contactId', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.sosContacts = user.sosContacts.filter(c => c._id.toString() !== req.params.contactId);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
