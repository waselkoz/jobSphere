const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending',
    },
    resume: {
        type: String, // Path to the file
        required: true,
    },
    coverLetter: {
        type: String,
    },
}, {
    timestamps: true,
});

// Prevent duplicate applications for the same job by the same user
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
