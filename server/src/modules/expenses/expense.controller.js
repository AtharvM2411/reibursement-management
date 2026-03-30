const expenseService = require("./expense.service");

const createExpense = async (req, res, next) => {
  try {
    const receiptUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;
    const expense = await expenseService.createExpense(
      req.body,
      req.user.userId,
      receiptUrl
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

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

module.exports = { createExpense, getMyExpenses, getAllExpenses };