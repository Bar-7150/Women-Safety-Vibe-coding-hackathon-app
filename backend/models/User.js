const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String },
    sosContacts: [{
        name: String,
        phone: String,
        priority: { type: Boolean, default: false }
    }],
    sosEvents: [{
        timestamp: { type: Date, default: Date.now },
        location: {
            lat: Number,
            lng: Number,
            address: String
        },
        videoUrl: String // Path to uploaded video
    }],
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email, name: this.name },
        process.env.JWT_SECRET || 'your-secret-key-here',
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

module.exports = mongoose.model('User', userSchema);
