const { body } = require('express-validator');

// Validation middleware
exports.validateUser = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().isLength({ min: 3 }).withMessage('Enter something in name'),
  body('number').isNumeric().isLength({max :11}).withMessage('Invalid phone number')
  


];
