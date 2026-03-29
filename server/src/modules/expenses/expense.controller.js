const expenseService = require("./expense.service");

const createExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.createExpense(
      req.body,
      req.user.userId
    );

    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

const getMyExpenses = async (req, res, next) => {
  try {
    const expenses = await expenseService.getMyExpenses(
      req.user.userId
    );

    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, getMyExpenses };