const prisma = require("../../config/db");

// Create Expense + Approval Workflow
const createExpense = async (data, userId, receiptUrl) => {
  const { amount, currency, description } = data;
  const amountValue = parseFloat(amount);
  if (isNaN(amountValue)) {
  throw new Error("Invalid amount");
}
  // 1️⃣ Create expense
  const expense = await prisma.expense.create({
    data: {
      amount: amountValue ,
      currency,
      description,
      userId,
      receiptUrl
    },
  });


const allUsers = await prisma.user.findMany();

  // 2️⃣ Get user (to find manager)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

if (!user) {
  throw new Error("User not found");
}

if (!user.managerId) {
  console.log("USER FOUND BUT NO MANAGER:", user);
  throw new Error("Manager not assigned to user");
}

  // 3️⃣ Create approval for manager 
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

const getAllExpenses = async () => {
  return await prisma.expense.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  createExpense,
  getMyExpenses,
  getAllExpenses,
};