const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Candidate)
const applyForJob = async (req, res) => {
    // req.body contains text fields, req.file contains the file
    const { jobId, coverLetter } = req.body;
    const resume = req.file ? req.file.path : null;

    if (!resume) {
        return res.status(400).json({ message: 'Please upload a resume (PDF/DOC)' });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check if already applied
        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: req.user.id
        });

        if (alreadyApplied) {
            res.status(400);
            throw new Error('You have already applied for this job');
        }

        const application = await Application.create({
            job: jobId,
            applicant: req.user.id,
            resume: resume, // Store path
            coverLetter: coverLetter
        });

        res.status(201).json(application);
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            res.status(400).json({ message: 'You have already applied for this job' });
        } else {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
};

// @desc    Get my applications
// @route   GET /api/applications/me
// @access  Private (Candidate)
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id })
            .populate('job', 'title company location salary');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter)
const getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check if user is the recruiter who posted the job
        if (job.recruiter.toString() !== req.user.id && req.user.realm !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to view applications for this job');
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate('applicant', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    applyForJob,
    getMyApplications,
    getJobApplications
};
