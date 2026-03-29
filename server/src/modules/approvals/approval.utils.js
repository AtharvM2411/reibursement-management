/**
 * Approvals Utilities (Backend)
 * Helper functions and constants for backend approval operations
 */

// Expense Status
const EXPENSE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  UNDER_REVIEW: 'UNDER_REVIEW'
};

// Approval Status
const APPROVAL_STATUS = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING'
};

/**
 * Generate approval notification data
 */
const generateApprovalNotification = (expense, action, metadata = {}) => {
  return {
    type: `EXPENSE_${action}`,
    recipient: expense.userId,
    subject: `Your expense has been ${action.toLowerCase()}`,
    data: {
      expenseId: expense.id,
      amount: expense.amount,
      description: expense.description,
      ...metadata
    },
    timestamp: new Date()
  };
};

/**
 * Check if user can approve expense
 */
const canUserApproveExpense = (user, expense) => {
  if (!user || !expense) {
    return false;
  }

  // Only MANAGER and ADMIN roles can approve
  if (!['MANAGER', 'ADMIN'].includes(user.role)) {
    return false;
  }

  // Cannot approve own expense
  if (user.id === expense.userId) {
    return false;
  }

  // Can only approve PENDING expenses
  if (expense.status !== EXPENSE_STATUS.PENDING) {
    return false;
  }

  return true;
};

/**
 * Validate approval data
 */
const validateApprovalData = (data) => {
  const errors = [];

  if (!data.approvedBy) {
    errors.push('Approver ID is required');
  }

  if (data.comments && data.comments.length > 500) {
    errors.push('Comments must not exceed 500 characters');
  }

  return errors;
};

/**
 * Validate rejection data
 */
const validateRejectionData = (data) => {
  const errors = [];

  if (!data.rejectedBy) {
    errors.push('Rejector ID is required');
  }

  if (!data.rejectionReason || data.rejectionReason.trim().length === 0) {
    errors.push('Rejection reason is required');
  }

  if (data.rejectionReason && data.rejectionReason.length > 500) {
    errors.push('Rejection reason must not exceed 500 characters');
  }

  return errors;
};

/**
 * Format approval record for response
 */
const formatApprovalRecord = (approval) => {
  return {
    id: approval.id,
    expenseId: approval.expenseId,
    status: approval.status,
    approvedBy: approval.approvedBy,
    rejectedBy: approval.rejectedBy,
    comments: approval.comments,
    rejectionReason: approval.rejectionReason,
    timestamp: approval.timestamp,
    createdAt: approval.createdAt
  };
};

/**
 * Calculate approval metrics
 */
const calculateApprovalMetrics = (expenses) => {
  const total = expenses.length;
  const approved = expenses.filter(e => e.status === EXPENSE_STATUS.APPROVED).length;
  const rejected = expenses.filter(e => e.status === EXPENSE_STATUS.REJECTED).length;
  const pending = expenses.filter(e => e.status === EXPENSE_STATUS.PENDING).length;

  return {
    total,
    approved,
    rejected,
    pending,
    approvalRate: total > 0 ? ((approved / total) * 100).toFixed(2) : 0,
    rejectionRate: total > 0 ? ((rejected / total) * 100).toFixed(2) : 0
  };
};

/**
 * Get date range query
 */
const getDateRangeQuery = (dateRange) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const ranges = {
    today: {
      gte: startOfDay,
      lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)
    },
    week: {
      gte: new Date(startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000)
    },
    month: {
      gte: new Date(startOfDay.getFullYear(), startOfDay.getMonth(), 1)
    },
    quarter: {
      gte: (() => {
        const quarter = Math.floor(startOfDay.getMonth() / 3);
        return new Date(startOfDay.getFullYear(), quarter * 3, 1);
      })()
    }
  };

  return ranges[dateRange] || {};
};

/**
 * Log approval action
 */
const logApprovalAction = async (action, userId, expenseId, metadata = {}) => {
  // Implement logging based on your logging service
  console.log(`[APPROVAL_LOG] Action: ${action}, User: ${userId}, Expense: ${expenseId}`, metadata);
};

/**
 * Send approval event (for event-driven architecture)
 */
const sendApprovalEvent = (eventType, data) => {
  // Implement event publishing based on your event system
  console.log(`[APPROVAL_EVENT] Event: ${eventType}`, data);
};

module.exports = {
  EXPENSE_STATUS,
  APPROVAL_STATUS,
  generateApprovalNotification,
  canUserApproveExpense,
  validateApprovalData,
  validateRejectionData,
  formatApprovalRecord,
  calculateApprovalMetrics,
  getDateRangeQuery,
  logApprovalAction,
  sendApprovalEvent
};
