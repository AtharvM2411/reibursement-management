const prisma = require("../../config/db");

// Create Expense + Approval Workflow
const createExpense = async (data, userId) => {
  const { amount, currency, description } = data;

  //  Create expense
  const expense = await prisma.expense.create({
    data: {
      amount,
      currency,
      description,
      userId,
    },
  });

  //  Create approval steps (basic workflow)
  await prisma.approval.createMany({
    data: [
      {
        expenseId: expense.id,
        approverId: "MANAGER_ID", // replace with real ID
        step: 1,
        status: "PENDING",
      },
      {
        expenseId: expense.id,
        approverId: "ADMIN_ID", // replace with real ID
        step: 2,
        status: "PENDING",
      },
    ],
  });

  return expense;
};

// Get logged-in user's expenses
const getMyExpenses = async (userId) => {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

module.exports = {
  createExpense,
  getMyExpenses,
};