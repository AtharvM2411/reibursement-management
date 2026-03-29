const prisma = require("../../config/db");

//  Get pending approvals for logged-in user
const getPendingApprovals = async (userId) => {
  return await prisma.approval.findMany({
  where: {
    approverId: userId,
    status: "PENDING",
  },
  include: {
    expense: true, // 🔥 ADD THIS
  },
});
};

//  Approve expense
const approveExpense = async (approvalId, userId) => {
  const approval = await prisma.approval.findUnique({
    where: { id: approvalId },
  });

  if (!approval) throw new Error("Approval not found");

  if (approval.approverId !== userId) {
    throw new Error("Not authorized");
  }

  // mark this step approved
  await prisma.approval.update({
    where: { id: approvalId },
    data: { status: "APPROVED" },
  });

  // check if next step exists
  const nextStep = await prisma.approval.findFirst({
    where: {
      expenseId: approval.expenseId,
      step: approval.step + 1,
    },
  });

  if (nextStep) {
    return { message: "Step approved, waiting for next approver" };
  }

  // no next step → final approval
  await prisma.expense.update({
    where: { id: approval.expenseId },
    data: { status: "APPROVED" },
  });

  return { message: "Expense fully approved" };
};

//  Reject expense
const rejectExpense = async (approvalId, userId) => {
  const approval = await prisma.approval.findUnique({
    where: { id: approvalId },
  });

  if (!approval) throw new Error("Approval not found");

  if (approval.approverId !== userId) {
    throw new Error("Not authorized");
  }

  // mark rejected
  await prisma.approval.update({
    where: { id: approvalId },
    data: { status: "REJECTED" },
  });

  // reject whole expense
  await prisma.expense.update({
    where: { id: approval.expenseId },
    data: { status: "REJECTED" },
  });

  return { message: "Expense rejected" };
};

module.exports = {
  getPendingApprovals,
  approveExpense,
  rejectExpense,
};