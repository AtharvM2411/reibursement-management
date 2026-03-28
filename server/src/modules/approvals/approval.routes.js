// Approvals Routes
// Defines all approval-related API endpoints

const express = require('express');
const router = express.Router();
const approvalsController = require('./approval.controller');
const { authMiddleware } = require('../../middleware/authMiddleware');
const { roleMiddleware } = require('../../middleware/roleMiddleware');

// All routes are protected by auth middleware
router.use(authMiddleware);

// GET endpoints
/**
 * Get pending expenses for approval
 * Query params: status, search, dateRange
 */
router.get('/pending', approvalsController.getPendingExpenses);

/**
 * Get details of a specific expense
 */
router.get('/expenses/:expenseId', approvalsController.getExpenseDetails);

/**
 * Get approval history for an expense
 */
router.get('/history/:expenseId', approvalsController.getApprovalHistory);

/**
 * Get approval statistics
 */
router.get('/stats', approvalsController.getApprovalStats);

/**
 * Get pending count
 */
router.get('/pending-count', approvalsController.getPendingCount);

/**
 * Get workflow status for an expense
 */
router.get('/workflow/:expenseId', approvalsController.getWorkflowStatus);

/**
 * Get dashboard statistics
 */
router.get('/dashboard/stats', approvalsController.getDashboardStats);

// POST endpoints (protected by role)
/**
 * Approve an expense
 */
router.post(
  '/approve/:expenseId',
  roleMiddleware(['MANAGER', 'ADMIN']),
  approvalsController.approveExpense
);

/**
 * Reject an expense
 */
router.post(
  '/reject/:expenseId',
  roleMiddleware(['MANAGER', 'ADMIN']),
  approvalsController.rejectExpense
);

/**
 * Bulk approve expenses
 */
router.post(
  '/bulk-approve',
  roleMiddleware(['MANAGER', 'ADMIN']),
  approvalsController.bulkApprove
);

/**
 * Reassign an approval
 */
router.post(
  '/reassign/:expenseId',
  roleMiddleware(['MANAGER', 'ADMIN']),
  approvalsController.reassignApproval
);

module.exports = router;
