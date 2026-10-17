import { body, param, query } from 'express-validator';

export const createExpenseValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .custom((val) => {
      const d = new Date(val);
      if (isNaN(d.getTime())) {
        throw new Error('Date must be a valid date');
      }
      return true;
    }),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 200 })
    .withMessage('Description must not exceed 200 characters'),
];

export const getExpensesValidator = [
  query('username')
    .trim()
    .notEmpty()
    .withMessage('Username query parameter is required'),
];

export const deleteExpenseValidator = [
  param('id')
    .notEmpty()
    .withMessage('Expense ID is required'),
];

export const resetExpensesValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
];

export const setBudgetValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('budget')
    .custom((value) => {
      if (value === "" || value === null) return true;
      const parsed = parseFloat(value);
      if (isNaN(parsed) || parsed < 0) {
        throw new Error('Budget must be a non-negative number');
      }
      return true;
    }),
];

export const getBudgetValidator = [
  query('username')
    .trim()
    .notEmpty()
    .withMessage('Username query parameter is required'),
];
