const prisma = require("../../config/db");

const createExpense = async (data, userId) => {
  const expense = await prisma.expense.create({
    data: {
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      userId: userId,
    },
  });

  return expense;
};

const getMyExpenses = async (userId) => {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

module.exports = { createExpense, getMyExpenses };