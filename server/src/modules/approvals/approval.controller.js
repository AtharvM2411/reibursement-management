const approvalService = require('./approval.service');

const approvalController = {
  getPendingApprovals: async (req, res, next) => {
    try {
      const approvals = await approvalService.getPendingApprovals(req.user?.id);
      res.status(200).json(approvals);
    } catch (error) {
      next(error);
    }
  },

  getApprovalById: async (req, res, next) => {
    try {
      const approval = await approvalService.getApprovalById(req.params.id);
      res.status(200).json(approval);
    } catch (error) {
      next(error);
    }
  },

  approveExpense: async (req, res, next) => {
    try {
      const approval = await approvalService.approveExpense(
        req.params.id,
        req.user?.id,
        req.body.comment
      );
      res.status(200).json(approval);
    } catch (error) {
      next(error);
    }
  },

  rejectExpense: async (req, res, next) => {
    try {
      const approval = await approvalService.rejectExpense(
        req.params.id,
        req.user?.id,
        req.body.reason
      );
      res.status(200).json(approval);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = approvalController;
