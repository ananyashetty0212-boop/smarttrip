import express from 'express';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/trips/:tripId/expenses')
  .get(protect, getExpenses)
  .post(protect, createExpense);

router.route('/expenses/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

export default router;
