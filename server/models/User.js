const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    realm: {
        type: String,
        enum: ['admin', 'recruiter', 'candidate'],
        default: 'candidate'
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    warnings: [{
        message: { type: String, required: true },
        date: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
