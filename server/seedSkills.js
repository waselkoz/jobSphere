const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const updateJobs = async () => {
    await connectDB();

    try {
        const result = await Job.updateMany(
            {},
            {
                $set: {
                    qualifications: ["Bachelor's Degree in Related Field", "3+ Years of Experience"],
                    hardSkills: ["React", "Node.js", "MongoDB"],
                    softSkills: ["Communication", "Problem Solving", "Team Leadership"]
                }
            }
        );
        console.log(`Updated ${result.modifiedCount} jobs with default skills.`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateJobs();
