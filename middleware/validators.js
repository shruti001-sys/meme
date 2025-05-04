const { body, param, query } = require('express-validator');

// User validation rules
const registerValidation = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/)
        .withMessage('Password must contain at least one letter'),
    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Bio cannot exceed 500 characters')
];

const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const updateProfileValidation = [
    body('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Bio cannot exceed 500 characters'),
    body('avatar')
        .optional()
        .isURL()
        .withMessage('Please provide a valid avatar URL')
];

// Meme validation rules
const uploadMemeValidation = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('category')
        .isIn(['funny', 'reaction', 'gaming', 'movies', 'tv-shows', 'animals', 'food', 'sports', 'tech', 'other'])
        .withMessage('Invalid category'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('tags')
        .optional()
        .isString()
        .withMessage('Tags must be a comma-separated string')
];

const memeIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid meme ID')
];

// Category validation rules
const categoryValidation = [
    param('category')
        .isIn(['funny', 'reaction', 'gaming', 'movies', 'tv-shows', 'animals', 'food', 'sports', 'tech', 'other'])
        .withMessage('Invalid category')
];

const sortValidation = [
    query('sort')
        .optional()
        .isIn(['newest', 'trending', 'top'])
        .withMessage('Invalid sort option'),
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Limit must be between 1 and 50')
];

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    uploadMemeValidation,
    memeIdValidation,
    categoryValidation,
    sortValidation
}; 