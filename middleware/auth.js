const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header('Authorization');
        console.log('Auth Header:', authHeader);
        
        if (!authHeader) {
            return res.status(401).json({
                error: 'Authentication required',
                message: 'No Authorization header provided'
            });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Authorization header must start with Bearer'
            });
        }

        const token = authHeader.replace('Bearer ', '');
        console.log('Token:', token);
        
        // Verify token
        const decoded = jwt.verify(token, config.JWT_SECRET);
        console.log('Decoded token:', decoded);
        
        // Find user
        const user = await User.findOne({ _id: decoded.userId });
        console.log('Found user:', user ? 'yes' : 'no');
        
        if (!user) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'User not found'
            });
        }

        // Add user to request
        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({
            error: 'Authentication failed',
            message: error.message,
            details: error
        });
    }
};

module.exports = auth; 