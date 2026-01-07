const express = require('express');
const router = express.Router();
const { createReview, getCompanyReviews, getRecentReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/recent', getRecentReviews);
router.post('/', protect, createReview);
router.get('/:companyName', getCompanyReviews);

module.exports = router;
