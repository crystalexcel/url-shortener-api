const express = require('express');
const cors = require('cors');

const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const shortUrlRoutes = require('./routes/shortUrlRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Public redirect must be early and unprotected
app.use('/', redirectRoutes);

// Auth + protected APIs
app.use('/auth', authRoutes);
app.use('/urls', shortUrlRoutes);
app.use('/analytics', analyticsRoutes);

app.use(errorHandler);

module.exports = app;
