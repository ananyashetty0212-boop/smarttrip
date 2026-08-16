import { Expense } from '../models/Expense.js';

// @desc    Get expenses for a trip
// @route   GET /api/trips/:tripId/expenses
export const getExpenses = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user?._id;

    if (Expense.db?.readyState === 1 && userId) {
      const expenses = await Expense.find({ tripId, userId }).sort({ createdAt: -1 });
      return res.json({ success: true, count: expenses.length, data: expenses });
    }

    return res.json({
      success: true,
      data: [
        { _id: 'exp-1', tripId, category: 'Accommodation', description: 'Beach Resort Deposit', amount: 300, date: '2026-09-10' },
        { _id: 'exp-2', tripId, category: 'Food & Dining', description: 'Greek Tavern Lunch', amount: 35, date: '2026-09-10' }
      ]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new expense to trip
// @route   POST /api/trips/:tripId/expenses
export const createExpense = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user?._id || 'usr-alex-123';
    const { category, description, amount, currency, date } = req.body;

    if (!category || !description || !amount) {
      return res.status(400).json({ success: false, message: 'Please provide category, description, and amount' });
    }

    if (Expense.db?.readyState === 1) {
      const expense = await Expense.create({
        tripId,
        userId,
        category,
        description,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        date: date || new Date().toISOString().split('T')[0]
      });
      return res.status(201).json({ success: true, data: expense });
    }

    const mockExp = {
      _id: `exp-${Date.now()}`,
      tripId,
      userId,
      category,
      description,
      amount: parseFloat(amount),
      currency: currency || 'USD',
      date: date || new Date().toISOString().split('T')[0]
    };
    return res.status(201).json({ success: true, data: mockExp });
  } catch (error) {
    next(error);
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (Expense.db?.readyState === 1 && userId) {
      const updated = await Expense.findOneAndUpdate({ _id: id, userId }, req.body, { new: true });
      return res.json({ success: true, data: updated });
    }

    return res.json({ success: true, data: { _id: id, ...req.body } });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (Expense.db?.readyState === 1 && userId) {
      await Expense.findOneAndDelete({ _id: id, userId });
      return res.json({ success: true, message: 'Expense deleted' });
    }

    return res.json({ success: true, message: 'Expense deleted' });
  } catch (error) {
    next(error);
  }
};
