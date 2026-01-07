const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
const getMyProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'email', 'realm']);

        if (!profile) {
            return res.status(404).json({ message: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
const updateProfile = async (req, res) => {
    const {
        title,
        bio,
        skills,
        location,
        socialLinks,
        qualifications,
        projects
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (title) profileFields.title = title;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (skills) profileFields.skills = skills; // Expecting array
    if (qualifications) profileFields.qualifications = qualifications;
    if (qualifications) profileFields.qualifications = qualifications;
    if (projects) profileFields.projects = projects;
    if (socialLinks) profileFields.socialLinks = socialLinks;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getMyProfile,
    updateProfile
};
