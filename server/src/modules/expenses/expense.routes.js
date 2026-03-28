const express = require('express');
const expenseController = require('./expense.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', expenseController.getAllExpenses);
router.get('/:id', expenseController.getExpenseById);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
