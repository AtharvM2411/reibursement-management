import api from './api';

const expenseService = {
  getAllExpenses: () => {
    return api.get('/expenses');
  },

  getExpenseById: (id) => {
    return api.get(`/expenses/${id}`);
  },

  createExpense: (expenseData) => {
    return api.post('/expenses', expenseData);
  },

  updateExpense: (id, expenseData) => {
    return api.put(`/expenses/${id}`, expenseData);
  },

  deleteExpense: (id) => {
    return api.delete(`/expenses/${id}`);
  },
};

export default expenseService;
