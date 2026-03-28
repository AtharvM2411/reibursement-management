// Redux or Zustand store for approvals

const approvalStore = {
  approvals: [],
  selectedApproval: null,
  isLoading: false,
  error: null,

  setApprovals: (approvals) => {
    approvalStore.approvals = approvals;
  },

  addApproval: (approval) => {
    approvalStore.approvals.push(approval);
  },

  removeApproval: (id) => {
    approvalStore.approvals = approvalStore.approvals.filter(a => a.id !== id);
  },

  selectApproval: (approval) => {
    approvalStore.selectedApproval = approval;
  },

  setLoading: (loading) => {
    approvalStore.isLoading = loading;
  },

  setError: (error) => {
    approvalStore.error = error;
  },
};

export default approvalStore;
