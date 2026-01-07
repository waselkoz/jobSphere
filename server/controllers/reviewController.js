const Review = require('../models/Review');
const Job = require('../models/Job');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
    try {
        const { companyName, rating, comment } = req.body;

        if (!companyName || !rating || !comment) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Optional: Check if the user already reviewed this company
        // const existingReview = await Review.findOne({
        //     user: req.user.id,
        //     companyName
        // });

        // if (existingReview) {
        //     return res.status(400).json({ message: 'You have already reviewed this company' });
        // }

        const review = await Review.create({
            companyName,
            user: req.user.id,
            rating,
            comment,
            role: req.body.role || 'Candidate'
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get reviews for a company
// @route   GET /api/reviews/:companyName
// @access  Public
const getCompanyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ companyName: req.params.companyName })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get recent reviews for homepage
// @route   GET /api/reviews
// @access  Public
const getRecentReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ rating: { $gte: 4 } })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name'); // Assuming user has a name field

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createReview,
    getCompanyReviews,
    getRecentReviews
};
