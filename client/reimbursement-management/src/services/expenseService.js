import api from "./api";

export const createExpense = async (data) => {
  const res = await api.post("/expenses", data);
  return res.data;
};

export const getMyExpenses = async () => {
  const res = await api.get("/expenses/my");
  return res.data;
};

export const getAllExpenses = async () => {
  const res = await api.get("/expenses/all");
  return res.data;
};