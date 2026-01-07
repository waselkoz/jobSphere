const User = require('../models/User');
const Profile = require('../models/Profile'); // Add import
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register User
const register = async (req, res) => {
    const { username, email, password, realm } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            realm: realm || 'candidate'
        });

        if (user) {
            // Initialize empty profile
            await Profile.create({
                user: user.id,
                skills: [],
                qualifications: [],
                projects: []
            });

            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                realm: user.realm,
                warnings: user.warnings,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && user.isBanned) {
            return res.status(403).json({ message: 'Your account has been disabled. Please contact support.' });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                realm: user.realm,
                warnings: user.warnings,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    register,
    login,
    getMe,
};
