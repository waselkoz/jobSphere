const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    title: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    skills: {
        type: [String],
        default: []
    },
    qualifications: [{
        degree: String,
        institution: String,
        year: String
    }],
    projects: [{
        title: String,
        description: String,
        link: String,
        tags: [String]
    }],
    location: {
        type: String,
        default: ''
    },
    socialLinks: {
        linkedin: String,
        github: String,
        website: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
