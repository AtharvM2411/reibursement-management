const expenseService = require('./expense.service');

const expenseController = {
  getAllExpenses: async (req, res, next) => {
    try {
      const expenses = await expenseService.getAllExpenses(req.user?.id);
      res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  },

  getExpenseById: async (req, res, next) => {
    try {
      const expense = await expenseService.getExpenseById(req.params.id);
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  },

  createExpense: async (req, res, next) => {
    try {
      const expenseData = { ...req.body, employee: req.user?.id };
      const expense = await expenseService.createExpense(expenseData);
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  },

  updateExpense: async (req, res, next) => {
    try {
      const expense = await expenseService.updateExpense(req.params.id, req.body);
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  },

  deleteExpense: async (req, res, next) => {
    try {
      await expenseService.deleteExpense(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = expenseController;
