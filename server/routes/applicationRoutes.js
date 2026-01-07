const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications, getJobApplications } = require('../controllers/applicationController');
const { protect, checkRealm } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, checkRealm(['candidate', 'admin']), upload.single('resume'), applyForJob);
router.get('/me', protect, getMyApplications);
router.get('/job/:jobId', protect, checkRealm(['recruiter', 'admin']), getJobApplications);

module.exports = router;
