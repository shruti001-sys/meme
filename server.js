const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
const config = require('./config/config');

// Import routes
const userRoutes = require('./routes/users');
const memeRoutes = require('./routes/memes');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

// Initialize express app
const app = express();

// Enhanced CORS configuration
app.use(cors(config.CORS_OPTIONS));

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    max: config.RATE_LIMIT_MAX_REQUESTS,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Logging
if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({
    limit: '50mb',
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.status(400).json({
                error: 'Invalid JSON',
                message: 'The request body contains invalid JSON'
            });
        }
    }
}));

app.use(express.urlencoded({ 
    extended: true, 
    limit: '50mb',
    parameterLimit: 10000
}));

// Static files
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log all requests for debugging
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.method === 'POST' ? 'Request body logged' : req.body
    });
    next();
});

// Ensure all responses are JSON
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/memes', memeRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    const health = {
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        database: {
            status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            connection: config.MONGODB_URI
        }
    };
    res.status(200).json(health);
});

// Test token endpoint
app.get('/api/test-token', (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        res.json({
            decoded,
            token,
            secret: config.JWT_SECRET
        });
    } catch (error) {
        res.status(401).json({
            error: 'Token verification failed',
            message: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Handle multer errors
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: 'File upload error',
            message: err.message
        });
    }

    // Handle other errors
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500,
            stack: config.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Connect to MongoDB and start server
async function startServer() {
    try {
        await mongoose.connect(config.MONGODB_URI, config.MONGODB_OPTIONS);
        console.log('Successfully connected to MongoDB');
        console.log(`MongoDB URI: ${config.MONGODB_URI}`);
        
        const server = app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
            console.log(`Environment: ${config.NODE_ENV}`);
            console.log(`Test the server at: http://localhost:${config.PORT}/api/health`);
        });

        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${config.PORT} is already in use. Please try a different port.`);
                process.exit(1);
            } else {
                console.error('Server error:', error);
            }
        });

    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.error('Please check:');
        console.error('1. MongoDB service is running');
        console.error('2. MongoDB URI is correct:', config.MONGODB_URI);
        console.error('3. MongoDB is accessible on port 27017');
        process.exit(1);
    }
}

startServer(); 