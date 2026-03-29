const prisma = require("../../config/db");

// Create Expense + Approval Workflow
const createExpense = async (data, userId) => {
  const { amount, currency, description } = data;

  // 1️⃣ Create expense
  const expense = await prisma.expense.create({
    data: {
      amount,
      currency,
      description,
      userId,
    },
  });

  // 2️⃣ Get user (to find manager)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.managerId) {
    throw new Error("Manager not assigned to user");
  }

  // 3️⃣ Create approval for manager (REAL FLOW 🔥)
  await prisma.approval.create({
    data: {
      expenseId: expense.id,
      approverId: user.managerId,
      step: 1,
      status: "PENDING",
    },
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