import api from './api';

const approvalService = {
  getPendingApprovals: () => {
    return api.get('/approvals/pending');
  },

  getApprovalById: (id) => {
    return api.get(`/approvals/${id}`);
  },

  approveExpense: (id, comment) => {
    return api.post(`/approvals/${id}/approve`, { comment });
  },

  rejectExpense: (id, reason) => {
    return api.post(`/approvals/${id}/reject`, { reason });
  },
};

export default approvalService;
