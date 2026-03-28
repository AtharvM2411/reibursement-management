const express = require('express');
const approvalController = require('./approval.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/pending', approvalController.getPendingApprovals);
router.get('/:id', approvalController.getApprovalById);
router.post('/:id/approve', approvalController.approveExpense);
router.post('/:id/reject', approvalController.rejectExpense);

module.exports = router;
