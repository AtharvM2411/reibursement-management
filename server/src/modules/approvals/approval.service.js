const prisma = require("../../config/db");

// get pending approvals for logged-in user
const getPendingApprovals = async (userId) => {
  return await prisma.approval.findMany({
    where: {
      approverId: userId,
      status: "PENDING",
    },
  });
};

// approve expense
const approveExpense = async (approvalId, userId) => {
  const approval = await prisma.approval.findUnique({
    where: { id: approvalId },
  });

  if (!approval) throw new Error("Approval not found");

  if (approval.approverId !== userId) {
    throw new Error("Not authorized");
  }

  // mark current approval as approved
  await prisma.approval.update({
    where: { id: approvalId },
    data: { status: "APPROVED" },
  });

  // check next step
  const nextApproval = await prisma.approval.findFirst({
    where: {
      expenseId: approval.expenseId,
      step: approval.step + 1,
    },
  });

  if (!nextApproval) {
    // final approval → mark expense approved
    await prisma.expense.update({
      where: { id: approval.expenseId },
      data: { status: "APPROVED" },
    });
  }

  return { message: "Approved successfully" };
};

// reject expense
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

  return { message: "Rejected successfully" };
};

module.exports = {
  getPendingApprovals,
  approveExpense,
  rejectExpense,
};