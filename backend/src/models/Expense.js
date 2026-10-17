import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: () => Date.now(),
      index: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model('Expense', expenseSchema);
