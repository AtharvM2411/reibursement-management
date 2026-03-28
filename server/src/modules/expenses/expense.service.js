const Expense = require('./expense.model');

const expenseService = {
  getAllExpenses: async (userId) => {
    const query = userId ? { employee: userId } : {};
    return await Expense.find(query).populate('employee approvedBy');
  },

  getExpenseById: async (id) => {
    const expense = await Expense.findById(id).populate('employee approvedBy');
    if (!expense) {
      throw { status: 404, message: 'Expense not found' };
    }
    return expense;
  },

  createExpense: async (expenseData) => {
    const expense = new Expense(expenseData);
    await expense.save();
    return await expense.populate('employee');
  },

  updateExpense: async (id, updateData) => {
    const expense = await Expense.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate('employee approvedBy');
    if (!expense) {
      throw { status: 404, message: 'Expense not found' };
    }
    return expense;
  },

  deleteExpense: async (id) => {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      throw { status: 404, message: 'Expense not found' };
    }
  },
};

module.exports = expenseService;
