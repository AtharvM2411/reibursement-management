

const expenseStore = {
  expenses: [],
  selectedExpense: null,
  isLoading: false,
  error: null,

  setExpenses: (expenses) => {
    expenseStore.expenses = expenses;
  },

  addExpense: (expense) => {
    expenseStore.expenses.push(expense);
  },

  removeExpense: (id) => {
    expenseStore.expenses = expenseStore.expenses.filter(e => e.id !== id);
  },

  selectExpense: (expense) => {
    expenseStore.selectedExpense = expense;
  },

  setLoading: (loading) => {
    expenseStore.isLoading = loading;
  },

  setError: (error) => {
    expenseStore.error = error;
  },
};

export default expenseStore;
