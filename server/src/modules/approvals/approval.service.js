const Approval = require('./approval.model');
const Expense = require('../expenses/expense.model');

const approvalService = {
  getPendingApprovals: async (approverId) => {
    return await Approval.find({
      approver: approverId,
      status: 'pending',
    }).populate('expense approver');
  },

  getApprovalById: async (id) => {
    const approval = await Approval.findById(id).populate('expense approver');
    if (!approval) {
      throw { status: 404, message: 'Approval not found' };
    }
    return approval;
  },

  approveExpense: async (approvalId, approverId, comment) => {
    try {
      const approval = await Approval.findByIdAndUpdate(
        approvalId,
        {
          status: 'approved',
          comment,
          approvalDate: new Date(),
        },
        { new: true }
      ).populate('expense approver');

      if (!approval) {
        throw { status: 404, message: 'Approval not found' };
      }

      // Update expense status
      await Expense.findByIdAndUpdate(approval.expense._id, {
        status: 'approved',
        approvedBy: approverId,
      });

      return approval;
    } catch (error) {
      throw error;
    }
  },

  rejectExpense: async (approvalId, approverId, reason) => {
    try {
      const approval = await Approval.findByIdAndUpdate(
        approvalId,
        {
          status: 'rejected',
          rejectionReason: reason,
          approvalDate: new Date(),
        },
        { new: true }
      ).populate('expense approver');

      if (!approval) {
        throw { status: 404, message: 'Approval not found' };
      }

      // Update expense status
      await Expense.findByIdAndUpdate(approval.expense._id, {
        status: 'rejected',
        rejectionReason: reason,
      });

      return approval;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = approvalService;
