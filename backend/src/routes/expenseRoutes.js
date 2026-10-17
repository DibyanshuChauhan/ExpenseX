import { Router } from 'express';
import {
  getExpenses,
  addExpense,
  deleteExpense,
  resetExpenses,
  getBudget,
  setBudget,
  getAllExpensesGrouped,
} from '../controllers/expenseController.js';
import {
  createExpenseValidator,
  getExpensesValidator,
  deleteExpenseValidator,
  resetExpensesValidator,
  setBudgetValidator,
  getBudgetValidator,
} from '../validators/expenseValidator.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

// Expense routes
router.get('/', getExpensesValidator, validate, getExpenses);
router.post('/', createExpenseValidator, validate, addExpense);
router.delete('/reset', resetExpensesValidator, validate, resetExpenses);
router.delete('/:id', deleteExpenseValidator, validate, deleteExpense);
router.get('/all-grouped', getAllExpensesGrouped);

// Budget routes
router.get('/budget', getBudgetValidator, validate, getBudget);
router.post('/budget', setBudgetValidator, validate, setBudget);

export default router;
