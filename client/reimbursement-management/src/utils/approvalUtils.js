
export const APPROVAL_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  UNDER_REVIEW: 'UNDER_REVIEW'
};


export const EXPENSE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  UNDER_REVIEW: 'UNDER_REVIEW'
};


export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE'
};


export const DATE_RANGES = {
  all: 'All Time',
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
  quarter: 'This Quarter'
};


export const STATUS_COLORS = {
  PENDING: '#FFC107',
  APPROVED: '#4CAF50',
  REJECTED: '#F44336',
  UNDER_REVIEW: '#2196F3'
};


export const STATUS_BADGE_CLASSES = {
  PENDING: 'badge-warning',
  APPROVED: 'badge-success',
  REJECTED: 'badge-danger',
  UNDER_REVIEW: 'badge-info'
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};


export const formatDate = (date, format = 'short') => {
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  };

  return new Date(date).toLocaleDateString('en-US', options[format] || options.short);
};


export const formatDateTime = (date) => {
  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const timeStr = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${dateStr} at ${timeStr}`;
};


export const calculateApprovalRate = (approved, total) => {
  if (total === 0) return 0;
  return ((approved / total) * 100).toFixed(2);
};


export const getStatusBadgeClass = (status) => {
  return STATUS_BADGE_CLASSES[status] || 'badge-default';
};


export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || '#999';
};


export const canApprove = (userRole) => {
  return [USER_ROLES.MANAGER, USER_ROLES.ADMIN].includes(userRole);
};


export const canAccessApprovalsPage = (userRole) => {
  return canApprove(userRole);
};


export const canExpenseBeApproved = (expense) => {
  return expense.status === EXPENSE_STATUS.PENDING;
};


export const canExpenseBeRejected = (expense) => {
  return expense.status === EXPENSE_STATUS.PENDING;
};


export const getActionLabel = (actionType) => {
  return {
    APPROVE: '✓ Approve',
    REJECT: '✕ Reject'
  }[actionType] || 'Action';
};


export const validateComments = (comments) => {
  const maxLength = 500;
  if (comments.length > maxLength) {
    return `Comments must not exceed ${maxLength} characters`;
  }
  return null;
};


export const validateRejectionReason = (reason) => {
  if (!reason || reason.trim().length === 0) {
    return 'Rejection reason is required';
  }
  if (reason.length > 500) {
    return 'Rejection reason must not exceed 500 characters';
  }
  return null;
};


export const getEmptyStateMessage = (filters) => {
  const { status, searchTerm } = filters;
  
  if (searchTerm) {
    return `No ${status?.toLowerCase() || 'expenses'} found matching "${searchTerm}"`;
  }
  
  return `No ${status?.toLowerCase() || 'expenses'} to review`;
};


export const groupExpensesByDate = (expenses) => {
  const grouped = {};

  expenses.forEach(expense => {
    const date = formatDate(expense.createdAt);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(expense);
  });

  return grouped;
};


export const getTotalAmount = (expenses) => {
  return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
};


export const getExpenseStatistics = (expenses) => {
  return {
    total: expenses.length,
    pending: expenses.filter(e => e.status === EXPENSE_STATUS.PENDING).length,
    approved: expenses.filter(e => e.status === EXPENSE_STATUS.APPROVED).length,
    rejected: expenses.filter(e => e.status === EXPENSE_STATUS.REJECTED).length,
    totalAmount: getTotalAmount(expenses),
    pendingAmount: getTotalAmount(
      expenses.filter(e => e.status === EXPENSE_STATUS.PENDING)
    ),
    averageAmount: expenses.length > 0 
      ? (getTotalAmount(expenses) / expenses.length).toFixed(2)
      : 0
  };
};


export const sortExpenses = (expenses, sortBy = 'date', order = 'desc') => {
  const sorted = [...expenses];

  switch (sortBy) {
    case 'date':
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'amount':
      sorted.sort((a, b) => b.amount - a.amount);
      break;
    case 'name':
      sorted.sort((a, b) => a.userName.localeCompare(b.userName));
      break;
    case 'status':
      sorted.sort((a, b) => a.status.localeCompare(b.status));
      break;
    default:
      break;
  }

  if (order === 'asc') {
    return sorted.reverse();
  }

  return sorted;
};


export const generateApprovalSummary = (expense, actionType, comments) => {
  const timestamp = formatDateTime(new Date());
  const action = actionType === 'APPROVE' ? 'APPROVED' : 'REJECTED';
  
  return {
    timestamp,
    action,
    amount: formatCurrency(expense.amount),
    employee: expense.userName,
    description: expense.description,
    comments: comments || 'No additional comments'
  };
};
