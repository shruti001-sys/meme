module.exports = {
    // JWT Configuration
    JWT_SECRET: 'vibememe-secret-key-2024-very-secure-and-long',
    JWT_EXPIRES_IN: '7d',

    // MongoDB Configuration
    MONGODB_URI: 'mongodb://127.0.0.1:27017/vibememe',
    MONGODB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    },

    // Server Configuration
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: 100,

    // Security
    CORS_OPTIONS: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
}; 