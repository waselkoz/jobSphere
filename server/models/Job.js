const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title'],
    },
    company: {
        type: String,
        required: [true, 'Please add a company name'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    requirements: {
        type: [String], // Array of strings for bullet points
        default: [],
    },
    qualifications: {
        type: [String], // e.g. "Master's Degree in CS", "5+ years exp"
        default: [],
    },
    hardSkills: {
        type: [String], // e.g. "React", "Node.js", "Python"
        default: [],
    },
    softSkills: {
        type: [String], // e.g. "Communication", "Teamwork"
        default: [],
    },
    companyLogo: {
        type: String,
        default: '',
    },
    companyBackground: {
        type: String,
        default: '',
    },
    salary: {
        type: String,
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true // Optional for now to allow easier seeding
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);
