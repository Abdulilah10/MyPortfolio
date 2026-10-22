
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');

const { connectToMongoDB } = require('./db');

const projectsRouter = require('./app/routes/project');
const referencesRouter = require('./app/routes/reference');
const servicesRouter = require('./app/routes/service');
const usersRouter = require('./app/routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/references', referencesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/users', usersRouter);

// Handle unknown routes
app.use((req, res, next) => {
    next(createError(404));
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

connectToMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to start server:', err);
    });
