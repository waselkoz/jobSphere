const express = require('express');
const router = express.Router();
const { getJobs, getMyJobs, getJobById, createJob, deleteJob } = require('../controllers/jobController');
const { protect, checkRealm } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/my', protect, checkRealm(['recruiter', 'admin']), getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, checkRealm(['recruiter', 'admin']), createJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
