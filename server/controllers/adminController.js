const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.realm === 'admin') {
            return res.status(400).json({ message: 'Cannot delete admin users' });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle user ban status
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin)
const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.realm === 'admin') {
            return res.status(400).json({ message: 'Cannot ban admin users' });
        }

        user.isBanned = !user.isBanned;
        await user.save();

        res.json({
            message: `User ${user.isBanned ? 'banned' : 'activated'}`,
            isBanned: user.isBanned
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send warning to user
// @route   POST /api/admin/users/:id/warning
// @access  Private (Admin)
const sendWarning = async (req, res) => {
    const { message } = req.body;
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.warnings) {
            user.warnings = [];
        }

        user.warnings.push({ message });
        await user.save();

        res.json({ message: 'Warning sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    toggleUserStatus,
    sendWarning
};
