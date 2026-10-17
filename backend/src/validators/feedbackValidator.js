import { body, param, query } from 'express-validator';

export const createFeedbackValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('feedback')
    .trim()
    .notEmpty()
    .withMessage('Feedback text is required')
    .isLength({ min: 3, max: 1000 })
    .withMessage('Feedback must be between 3 and 1000 characters'),
];

export const deleteFeedbackValidator = [
  param('id')
    .notEmpty()
    .withMessage('Feedback ID is required'),
];
