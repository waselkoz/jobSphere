const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedAdmin = async () => {
    try {
        const adminEmail = 'wassimselama@gmail.com';
        const adminPassword = 'waselkoz';

        // Check if user exists
        let user = await User.findOne({ email: adminEmail });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        if (user) {
            // Update existing user to admin
            user.realm = 'admin';
            user.password = hashedPassword;
            await user.save();
            console.log('Existing user updated to Admin');
        } else {
            // Create new admin
            await User.create({
                username: 'Wassim Admin',
                email: adminEmail,
                password: hashedPassword,
                realm: 'admin'
            });
            console.log('Admin user created successfully');
        }

        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
