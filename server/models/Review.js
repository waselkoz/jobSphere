const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Please add a company name'],
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating between 1 and 5'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    },
    role: {
        type: String,
        enum: ['Candidate', 'Recruiter'],
        default: 'Candidate'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
