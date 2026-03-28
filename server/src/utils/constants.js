// Server-side constants
const constants = {
  ROLES: {
    ADMIN: 'admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
  },

  EXPENSE_STATUS: {
    DRAFT: 'draft',
    SUBMITTED: 'submitted',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    REIMBURSED: 'reimbursed',
  },

  APPROVAL_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  },

  EXPENSE_CATEGORIES: [
    'Travel',
    'Meals',
    'Office Supplies',
    'Equipment',
    'Other',
  ],

  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
};

module.exports = constants;
