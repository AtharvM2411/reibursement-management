import API from './api';

export const approvalsService = {
  
  getPendingExpenses: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.status && filters.status !== 'all') {
        params.append('status', filters.status);
      }
      if (filters.searchTerm) {
        params.append('search', filters.searchTerm);
      }
      if (filters.dateRange) {
        params.append('dateRange', filters.dateRange);
      }

      const response = await API.get(`/api/approvals/pending?${params.toString()}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching pending expenses:', error);
      throw error;
    }
  },

  
  getExpenseDetails: async (expenseId) => {
    try {
      const response = await API.get(`/api/approvals/expenses/${expenseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expense details:', error);
      throw error;
    }
  },

  
  approveExpense: async (expenseId, approvalData) => {
    try {
      const response = await API.post(`/api/approvals/approve/${expenseId}`, {
        approvedBy: approvalData.approvedBy,
        comments: approvalData.comments,
        approvalDate: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error approving expense:', error);
      throw error;
    }
  },

  rejectExpense: async (expenseId, rejectionData) => {
    try {
      const response = await API.post(`/api/approvals/reject/${expenseId}`, {
        rejectedBy: rejectionData.rejectedBy,
        rejectionReason: rejectionData.rejectionReason,
        rejectionDate: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error rejecting expense:', error);
      throw error;
    }
  },

  
  getApprovalHistory: async (expenseId) => {
    try {
      const response = await API.get(`/api/approvals/history/${expenseId}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching approval history:', error);
      throw error;
    }
  },

 
  getApprovalStats: async () => {
    try {
      const response = await API.get('/api/approvals/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching approval stats:', error);
      throw error;
    }
  },

 
  bulkApprove: async (expenseIds, approvalData) => {
    try {
      const response = await API.post('/api/approvals/bulk-approve', {
        expenseIds,
        approvedBy: approvalData.approvedBy,
        comments: approvalData.comments
      });
      return response.data;
    } catch (error) {
      console.error('Error bulk approving expenses:', error);
      throw error;
    }
  },

  /**
   * Get approval workflow status
   */
  getWorkflowStatus: async (expenseId) => {
    try {
      const response = await API.get(`/api/approvals/workflow/${expenseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching workflow status:', error);
      throw error;
    }
  },

 
  getDashboardStats: async () => {
    try {
      const response = await API.get('/api/approvals/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
};

export default approvalsService;
