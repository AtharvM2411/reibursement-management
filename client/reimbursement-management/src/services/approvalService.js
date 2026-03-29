import api from "./api";

//  Get pending approvals
export const getPendingApprovals = async () => {
  const res = await api.get("/approvals/pending");
  return res.data;
};

//  Approve expense
export const approveExpense = async (approvalId) => {
  const res = await api.post(`/approvals/${approvalId}/approve`);
  return res.data;
};

// Reject expense
export const rejectExpense = async (approvalId) => {
  const res = await api.post(`/approvals/${approvalId}/reject`);
  return res.data;
};