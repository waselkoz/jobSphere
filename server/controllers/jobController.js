const Job = require('../models/Job');

// @desc    Get all jobs (with search)
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const search = req.query.keyword || '';
        const keyword = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { hardSkills: { $in: [new RegExp(search, 'i')] } },
                { softSkills: { $in: [new RegExp(search, 'i')] } },
                { qualifications: { $in: [new RegExp(search, 'i')] } },
            ]
        } : {};

        const jobs = await Job.find({ ...keyword }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my posted jobs
// @route   GET /api/jobs/my
// @access  Private (Recruiter)
const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ recruiter: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Recruiter/Admin)
const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            recruiter: req.user.id
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Admin/Recruiter)
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check if user is admin or the job owner
        if (req.user.realm !== 'admin' && job.recruiter.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        await job.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getJobs,
    getMyJobs,
    getJobById,
    createJob,
    deleteJob,
};
