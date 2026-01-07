const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

dotenv.config();

const app = express();

// Security Middleware
// Security Middleware
// app.use(helmet({
//   contentSecurityPolicy: false,
// }));
// app.use(mongoSanitize());
// app.use(xss());

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 100
// });
// app.use('/api', limiter);

// Compression
app.use(compression());

// Body Parsers & CORS
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://jobsphere-lwkm.onrender.com'],
  credentials: true
}));

// Serve Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logging (Dev only ideally, keeping for now)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Serve Static Assets in Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // SPA Fallback (using use instead of get * to avoid crash)
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send("API is running... (Dev Mode)");
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
