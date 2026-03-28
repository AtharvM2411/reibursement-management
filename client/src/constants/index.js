

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

export const EXPENSE_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REIMBURSED: 'reimbursed',
};

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const EXPENSE_CATEGORIES = [
  'Travel',
  'Meals',
  'Office Supplies',
  'Equipment',
  'Other',
];

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  EXPENSES: '/api/expenses',
  APPROVALS: '/api/approvals',
  RULES: '/api/rules',
};
