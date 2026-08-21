require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const rateLimit = require('express-rate-limit');

const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

/* ── Security middleware ───────────────────────────── */

// HTTP security headers
app.use(helmet());

// CORS — restrict to frontend origin
const allowedOrigins = [
  process.env.FRONTEND_URL,
  // Allow localhost in development
  ...(!isProduction ? ['http://localhost:5173', 'http://localhost:4173'] : []),
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman in dev)
    if (!origin && !isProduction) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // required for httpOnly cookies
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

// Cookie parser (for admin JWT in httpOnly cookies)
app.use(cookieParser());

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

/* ── Rate limiters ─────────────────────────────────── */

// Contact form: 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Please try again in a few minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin login: 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin API: 30 requests per 15 minutes
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Rate limit exceeded.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ── Routes ────────────────────────────────────────── */

app.use('/api/contact', contactLimiter, contactRoute);

// Admin routes
const adminRoute = require('./routes/admin');
app.use('/api/admin/login', loginLimiter, adminRoute);
app.use('/api/admin', adminLimiter, adminRoute);

// Health check (useful for Render deploy monitoring)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── Global error handler ──────────────────────────── */
// Never expose stack traces or sensitive errors to visitors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: isProduction
      ? 'An unexpected error occurred.'
      : err.message || 'An unexpected error occurred.',
  });
});

/* ── Database connection & server start ────────────── */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB${isProduction ? ' Atlas' : ' (local)'}`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} [${isProduction ? 'production' : 'development'}]`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
