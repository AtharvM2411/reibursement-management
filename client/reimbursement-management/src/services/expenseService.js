import api from "./api";

export const createExpense = async (data) => {
  const res = await api.post("/expenses", data);
  return res.data;
};
await prisma.approval.createMany({
  data: [
    {
      expenseId: expense.id,
      approverId: "MANAGER_ID",
      step: 1,
    },
    {
      expenseId: expense.id,
      approverId: "FINANCE_ID",
      step: 2,
    },
  ],
});
export const getMyExpenses = async () => {
  const res = await api.get("/expenses/my");
  return res.data;
};