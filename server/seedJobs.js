const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedJobs = async () => {
    try {
        // specific admin user we created
        const admin = await User.findOne({ email: 'wassimselama@gmail.com' });

        if (!admin) {
            console.log('Admin user not found, run seedAdmin.js first');
            process.exit();
        }

        await Job.deleteMany({}); // Clear existing jobs

        const jobs = [
            {
                title: 'Senior React Developer',
                company: 'TechFlow',
                location: 'Algeria, El Harrach',
                description: 'We are seeking a Senior React Developer to spearhead our frontend architecture. You will be responsible for building scalable web applications using Next.js and TypeScript. Key responsibilities include optimizing component performance, conducting code reviews, and mentoring junior developers.',
                salary: '120,000 - 150,000',
                recruiter: admin._id,
                type: 'Full-time',
                level: 'Senior',
                hardSkills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind'],
                softSkills: ['Leadership', 'Mentoring', 'Communication'],
                qualifications: ['Bachelor\'s in CS', '5+ years experience']
            },
            {
                title: 'Full Stack Engineer (MERN)',
                company: 'StartUp Inc',
                location: 'Algeria, Blida',
                description: 'Join our engineering team to build robust e-commerce solutions. You will handle the full lifecycle of software development, from designing database schemas in MongoDB to implementing RESTful APIs with Express and Node.js.',
                salary: '100,000 - 130,000',
                recruiter: admin._id,
                type: 'Full-time',
                level: 'Mid-Level',
                hardSkills: ['MongoDB', 'Express', 'React', 'Node.js', 'Docker'],
                softSkills: ['Problem Solving', 'Team Player'],
                qualifications: ['Master\'s in CS preferred']
            },
            {
                title: 'UI/UX Designer',
                company: 'Creative Studio',
                location: 'Algeria, Zeralda',
                description: 'We are looking for a creative UI/UX Designer to craft intuitive and visually stunning user experiences. You will collaborate with product managers and developers to translate requirements into wireframes, prototypes, and high-fidelity mockups using Figma.',
                salary: '80,000 - 100,000',
                recruiter: admin._id,
                type: 'Contract',
                level: 'Mid-Level',
                hardSkills: ['Figma', 'Adobe XD', 'Prototyping', 'CSS Basics'],
                softSkills: ['Creativity', 'Attention to Detail'],
                qualifications: ['Portfolio required']
            },
            {
                title: 'DevOps Engineer',
                company: 'CloudSystems',
                location: 'Algeria, El Biar',
                description: 'Manage and optimize our cloud infrastructure on AWS. You will be actively involved in automating deployment pipelines using Jenkins or GitHub Actions, containerizing applications with Docker, and orchestrating them via Kubernetes.',
                salary: '130,000 - 160,000',
                recruiter: admin._id,
                type: 'Full-time',
                level: 'Senior',
                hardSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
                softSkills: ['Analytical', 'Crisis Management'],
                qualifications: ['AWS Certified']
            },
            {
                title: 'Product Manager',
                company: 'InnovateNow',
                location: 'Algeria, Bab Zouar',
                description: 'Drive the product vision from conception to launch. You will define product roadmaps, gather requirements from stakeholders, and prioritize features based on user feedback and market research.',
                salary: '140,000 - 180,000',
                recruiter: admin._id,
                type: 'Full-time',
                level: 'Lead',
                hardSkills: ['Jira', 'Agile', 'Roadmapping', 'Data Analysis'],
                softSkills: ['Leadership', 'Communication', 'Strategic Thinking'],
                qualifications: ['MBA or equivalent']
            },
            {
                title: 'Junior Frontend Developer',
                company: 'WebSolutions',
                location: 'Algeria, Tipaza',
                description: 'An excellent opportunity for an aspiring developer to kickstart their career. You will assist in developing and maintaining client websites using HTML5, CSS3, and JavaScript.',
                salary: '60,000 - 80,000',
                recruiter: admin._id,
                type: 'Part-time',
                level: 'Junior',
                hardSkills: ['HTML', 'CSS', 'JavaScript', 'Git'],
                softSkills: ['Eagerness to Learn', 'Adaptability'],
                qualifications: ['Bootcamp or Degree']
            },
            {
                title: 'Data Scientist',
                company: 'DataCorp',
                location: 'Algeria, Djelfa',
                description: 'We need a analytical thinker to extract meaningful insights from complex datasets. You will build and validate predictive models using Python, Pandas, and Scikit-learn.',
                salary: '110,000 - 140,000',
                recruiter: admin._id,
                type: 'Remote',
                level: 'Senior',
                hardSkills: ['Python', 'Pandas', 'Machine Learning', 'SQL'],
                softSkills: ['Critical Thinking', 'Storytelling'],
                qualifications: ['Master\'s in Data Science']
            },
            {
                title: 'Mobile App Developer (Flutter)',
                company: 'Appify',
                location: 'Algeria, Oran',
                description: 'Develop high-performance cross-platform mobile applications using Flutter and Dart. You will implement custom UI components, integrate third-party APIs, and ensure smooth performance on both iOS and Android devices.',
                salary: '90,000 - 120,000',
                recruiter: admin._id,
                type: 'Contract',
                level: 'Mid-Level',
                hardSkills: ['Flutter', 'Dart', 'Firebase', 'Mobile UI'],
                softSkills: ['Independence', 'Creativity'],
                qualifications: ['Published apps on Store']
            },
            {
                title: 'Cybersecurity Analyst',
                company: 'SecureNet',
                location: 'Algeria, Constantine',
                description: 'Monitor our networks for security breaches and investigate violations. You will conduct penetration testing, vulnerability assessments, and implement security measures.',
                salary: '115,000 - 145,000',
                recruiter: admin._id,
                type: 'Full-time',
                level: 'Senior',
                hardSkills: ['Network Security', 'Pen Testing', 'Firewalls', 'SIEM'],
                softSkills: ['Integrity', 'Attention to Detail'],
                qualifications: ['CISSP or equivalent']
            },
            {
                title: 'Blockchain Developer',
                company: 'CryptoWorld',
                location: 'Algeria, Annaba',
                description: 'Design and implement decentralized applications (DApps) and smart contracts on the Ethereum blockchain. You must receive a deep understanding of cryptography and Solidity.',
                salary: '150,000 - 200,000',
                recruiter: admin._id,
                type: 'Remote',
                level: 'Lead',
                hardSkills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts'],
                softSkills: ['Innovation', 'Logic'],
                qualifications: ['Strong Math background']
            }
        ];

        await Job.insertMany(jobs);
        console.log('Jobs seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedJobs();
