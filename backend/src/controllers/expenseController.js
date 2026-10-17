import { Expense } from '../models/Expense.js';
import { Budget } from '../models/Budget.js';
import { User } from '../models/User.js';

/**
 * Get all expenses for a specific user
 */
export const getExpenses = async (req, res) => {
  try {
    const { username } = req.query;
    const expenses = await Expense.find({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching expenses' });
  }
};

/**
 * Add an expense
 */
export const addExpense = async (req, res) => {
  try {
    const { username, amount, category, date, description } = req.body;

    const newExpense = await Expense.create({
      id: Date.now(),
      username,
      amount: parseFloat(amount),
      category,
      date,
      description,
    });

    return res.status(201).json({
      success: true,
      message: 'Expense added successfully!',
      expense: newExpense,
    });
  } catch (error) {
    console.error('Add expense error:', error);
    return res.status(500).json({ success: false, message: 'Server error adding expense' });
  }
};

/**
 * Delete single expense
 */
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findOneAndDelete({
      $or: [{ id: isNaN(Number(id)) ? -1 : Number(id) }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Expense not found!' });
    }

    return res.status(200).json({ success: true, message: 'Expense deleted successfully!' });
  } catch (error) {
    console.error('Delete expense error:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting expense' });
  }
};

/**
 * Reset all expenses for a user
 */
export const resetExpenses = async (req, res) => {
  try {
    const { username } = req.body;

    await Expense.deleteMany({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    return res.status(200).json({ success: true, message: 'All expenses reset successfully!' });
  } catch (error) {
    console.error('Reset expenses error:', error);
    return res.status(500).json({ success: false, message: 'Server error resetting expenses' });
  }
};

/**
 * Get user budget
 */
export const getBudget = async (req, res) => {
  try {
    const { username } = req.query;

    const foundBudget = await Budget.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    const budgetVal = foundBudget ? foundBudget.budget : '';
    return res.status(200).json({ success: true, budget: budgetVal });
  } catch (error) {
    console.error('Get budget error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching budget' });
  }
};

/**
 * Set user budget
 */
export const setBudget = async (req, res) => {
  try {
    const { username, budget } = req.body;

    if (budget === '' || budget === null || budget === undefined) {
      await Budget.findOneAndDelete({
        username: { $regex: new RegExp(`^${username}$`, 'i') },
      });
      return res.status(200).json({
        success: true,
        message: 'Budget cleared successfully!',
        budget: '',
      });
    }

    const numBudget = parseFloat(budget);
    const updatedBudget = await Budget.findOneAndUpdate(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      { username, budget: numBudget },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Budget updated successfully!',
      budget: updatedBudget.budget,
    });
  } catch (error) {
    console.error('Set budget error:', error);
    return res.status(500).json({ success: false, message: 'Server error setting budget' });
  }
};

/**
 * Admin: Get all expenses grouped by user
 */
export const getAllExpensesGrouped = async (req, res) => {
  try {
    const users = await User.find({});
    const allExpenses = await Expense.find({});

    const grouped = {};
    users.forEach((u) => {
      grouped[u.username] = allExpenses.filter(
        (e) => e.username.toLowerCase() === u.username.toLowerCase()
      );
    });

    return res.status(200).json({ success: true, expenses: grouped });
  } catch (error) {
    console.error('Get all expenses grouped error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching grouped expenses' });
  }
};
