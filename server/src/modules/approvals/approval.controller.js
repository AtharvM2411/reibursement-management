

const approvalsService = require('./approval.service');
const { validateApprovalAction } = require('./approval.validation');

class ApprovalsController {
  
  async getPendingExpenses(req, res) {
    try {
      const { status = 'PENDING', search = '', dateRange = 'all' } = req.query;
      const userId = req.user.id;
      const userRole = req.user.role;

      const expenses = await approvalsService.getPendingExpenses({
        status,
        search,
        dateRange,
        userId,
        userRole
      });

      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
  async getExpenseDetails(req, res) {
    try {
      const { expenseId } = req.params;
      const expense = await approvalsService.getExpenseDetails(expenseId);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      res.json(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async approveExpense(req, res) {
    try {
      const { expenseId } = req.params;
      const { approvedBy, comments } = req.body;
      const userId = req.user.id;

     
      if (!expenseId) {
        return res.status(400).json({ error: 'Expense ID is required' });
      }

      
      const hasPermission = await approvalsService.checkApprovalPermission(
        userId,
        expenseId
      );
      if (!hasPermission) {
        return res.status(403).json({ error: 'Unauthorized to approve this expense' });
      }

      const result = await approvalsService.approveExpense(expenseId, {
        approvedBy: userId,
        comments,
        approvalDate: new Date()
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
  async rejectExpense(req, res) {
    try {
      const { expenseId } = req.params;
      const { rejectedBy, rejectionReason } = req.body;
      const userId = req.user.id;

      if (!expenseId) {
        return res.status(400).json({ error: 'Expense ID is required' });
      }

      if (!rejectionReason || rejectionReason.trim().length === 0) {
        return res.status(400).json({ error: 'Rejection reason is required' });
      }

     
      const hasPermission = await approvalsService.checkApprovalPermission(
        userId,
        expenseId
      );
      if (!hasPermission) {
        return res.status(403).json({ error: 'Unauthorized to reject this expense' });
      }

      const result = await approvalsService.rejectExpense(expenseId, {
        rejectedBy: userId,
        rejectionReason,
        rejectionDate: new Date()
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
  async getApprovalHistory(req, res) {
    try {
      const { expenseId } = req.params;

      const history = await approvalsService.getApprovalHistory(expenseId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async getApprovalStats(req, res) {
    try {
      const userId = req.user.id;
      const stats = await approvalsService.getApprovalStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async bulkApprove(req, res) {
    try {
      const { expenseIds, comments } = req.body;
      const userId = req.user.id;

      if (!Array.isArray(expenseIds) || expenseIds.length === 0) {
        return res.status(400).json({ error: 'Expense IDs array is required' });
      }

      const results = await approvalsService.bulkApprove(expenseIds, {
        approvedBy: userId,
        comments
      });

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async getWorkflowStatus(req, res) {
    try {
      const { expenseId } = req.params;

      const status = await approvalsService.getWorkflowStatus(expenseId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async getDashboardStats(req, res) {
    try {
      const userId = req.user.id;
      const userRole = req.user.role;

      const stats = await approvalsService.getDashboardStats(userId, userRole);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async reassignApproval(req, res) {
    try {
      const { expenseId } = req.params;
      const { reassignTo, reason } = req.body;

      if (!reassignTo) {
        return res.status(400).json({ error: 'Reassign target is required' });
      }

      const result = await approvalsService.reassignApproval(expenseId, {
        reassignedBy: req.user.id,
        reassignTo,
        reason
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async getPendingCount(req, res) {
    try {
      const userId = req.user.id;
      const count = await approvalsService.getPendingCount(userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ApprovalsController();
