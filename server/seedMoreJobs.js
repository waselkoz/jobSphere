const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');

dotenv.config({ path: './server/.env' });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const jobs = [
    {
        title: "Senior Frontend Engineer",
        company: "TechFlow",
        location: "Algiers, Algeria",
        salary: "150,000 DA - 250,000 DA",
        description: "We are looking for a React expert to lead our frontend team. You will be responsible for architecture and mentorship.",
        requirements: ["5+ years React", "TypeScript", "Next.js"],
        qualifications: ["Bachelor's in CS", "Leadership Experience"],
        hardSkills: ["React", "Redux", "GraphQL"],
        softSkills: ["Leadership", "Mentoring"],
        companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
        companyBackground: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop"
    },
    {
        title: "Backend Developer",
        company: "CloudSystems",
        location: "Oran, Algeria",
        salary: "140,000 DA - 200,000 DA",
        description: "Scale our distributed systems. Experience with Go and Kubernetes is a plus.",
        requirements: ["Node.js", "Microservices", "AWS"],
        qualifications: ["Master's in Distributed Systems"],
        hardSkills: ["Go", "Kubernetes", "Docker"],
        softSkills: ["Problem Solving", "Autonomy"],
        companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
        companyBackground: "https://images.unsplash.com/photo-1558494949-efc5e60dcafa?w=1200&h=400&fit=crop"
    },
    {
        title: "Product Designer",
        company: "Creative Studio",
        location: "Bejaia, Algeria",
        salary: "120,000 DA - 180,000 DA",
        description: "Craft beautiful and intuitive user experiences for top-tier clients.",
        requirements: ["Figma", "Prototyping", "User Research"],
        qualifications: ["Portfolio required"],
        hardSkills: ["Figma", "Adobe XD", "Sketch"],
        softSkills: ["Creativity", "Empathy"],
        companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
        companyBackground: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=400&fit=crop"
    },
    {
        title: "Data Scientist",
        company: "DataCorp",
        location: "Sidi Bel Abbes, Algeria",
        salary: "160,000 DA - 220,000 DA",
        description: "Analyze large datasets to drive business insights and build ML models.",
        requirements: ["Python", "Pandas", "Machine Learning"],
        qualifications: ["PhD in Statistics or related field"],
        hardSkills: ["Python", "TensorFlow", "SQL"],
        softSkills: ["Communication", "Analytical Thinking"],
        companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
        companyBackground: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=400&fit=crop"
    },
    {
        title: "DevOps Engineer",
        company: "StartUp Inc",
        location: "Remote (Algeria)",
        salary: "130,000 DA - 190,000 DA",
        description: "Automate our CI/CD pipelines and ensure high availability.",
        requirements: ["Jenkins", "Terraform", "Linux"],
        qualifications: ["AWS Certified"],
        hardSkills: ["Terraform", "Ansible", "Bash"],
        softSkills: ["Teamwork", "Crisis Management"],
        companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
        companyBackground: "https://images.unsplash.com/photo-1531297461136-82088dfd355c?w=1200&h=400&fit=crop"
    }
];

// Helper to generate more variations
const generateJobs = () => {
    const moreJobs = [];
    const roles = ["Software Engineer", "Marketing Manager", "Sales Rep", "HR Specialist", "Content Writer", "Project Manager", "Accountant"];
    const companies = ["TechFlow", "CloudSystems", "Creative Studio", "DataCorp", "StartUp Inc"];
    const locations = ["Algiers, Algeria", "Oran, Algeria", "Constantine, Algeria", "Annaba, Algeria", "Setif, Algeria", "Batna, Algeria", "Tlemcen, Algeria", "Ghardaia, Algeria"];

    // Logos corresponding to companies
    const logos = [
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop", // TechFlow
        "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=100&h=100&fit=crop", // CloudSystems
        "https://images.unsplash.com/photo-1572044162444-ad6021194362?w=100&h=100&fit=crop", // Creative Studio
        "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop", // DataCorp
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop"  // StartUp Inc
    ];

    // Backgrounds
    const backgrounds = [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1558494949-efc5e60dcafa?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1531297461136-82088dfd355c?w=1200&h=400&fit=crop"
    ];

    for (let i = 0; i < 40; i++) {
        const companyIndex = Math.floor(Math.random() * companies.length);
        moreJobs.push({
            title: roles[Math.floor(Math.random() * roles.length)],
            company: companies[companyIndex],
            location: locations[Math.floor(Math.random() * locations.length)],
            salary: `${(80 + Math.floor(Math.random() * 12) * 10) * 1000} DA - ${(150 + Math.floor(Math.random() * 10) * 10) * 1000} DA`,
            description: "An exciting opportunity to join a fast-paced team in Algeria's growing market.",
            requirements: ["Experience in related field", "Team player"],
            qualifications: ["Degree preferred"],
            hardSkills: ["Skill A", "Skill B"],
            softSkills: ["Communication", "Adaptability"],
            companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
            companyBackground: backgrounds[Math.floor(Math.random() * backgrounds.length)]
        });
    }
    return [...jobs, ...moreJobs];
};

const seedJobs = async () => {
    await connectDB();

    try {
        const admin = await User.findOne({ realm: 'admin' });
        if (!admin) {
            console.log('Admin user not found. Please run seedAdmin.js first.');
            process.exit(1);
        }

        const jobList = generateJobs().map(job => ({ ...job, recruiter: admin._id }));

        await Job.deleteMany({});
        console.log('Cleared existing jobs.');

        await Job.insertMany(jobList);
        console.log('Jobs seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedJobs();
