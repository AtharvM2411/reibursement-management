// Approvals Service
// Business logic for approval operations

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const notificationService = require('../notifications/notification.service');

class ApprovalsService {
  /**
   * Get all pending expenses for approval
   */
  async getPendingExpenses(filters) {
    try {
      const { status = 'PENDING', search = '', dateRange = 'all', userId, userRole } = filters;

      let whereClause = {};

      // Filter by status
      if (status && status !== 'all') {
        whereClause.status = status;
      }

      // Filter by date range
      const now = new Date();
      if (dateRange) {
        const dateFilters = this.getDateRangeFilter(dateRange);
        whereClause.createdAt = dateFilters;
      }

      // Apply role-based filtering
      if (userRole === 'MANAGER') {
        // Managers can only approve expenses from their department
        whereClause.departmentId = userId; // Assuming department association
      } else if (userRole !== 'ADMIN') {
        // Only admins and managers can see approval list
        return [];
      }

      // Search by employee name or ID
      if (search && search.trim()) {
        whereClause.OR = [
          { user: { name: { contains: search, mode: 'insensitive' } } },
          { id: { contains: search, mode: 'insensitive' } }
        ];
      }

      const expenses = await prisma.expense.findMany({
        where: whereClause,
        include: {
          user: { select: { id: true, name: true, email: true } },
          approvals: { orderBy: { createdAt: 'desc' } }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Format the response
      return expenses.map(expense => ({
        id: expense.id,
        amount: expense.amount,
        currency: expense.currency,
        description: expense.description,
        status: expense.status,
        category: expense.category,
        createdAt: expense.createdAt,
        userId: expense.userId,
        userName: expense.user.name,
        userEmail: expense.user.email,
        approvedBy: expense.approvals[0]?.approvedBy,
        rejectedBy: expense.approvals[0]?.rejectedBy,
        lastApprovalDate: expense.approvals[0]?.createdAt
      }));
    } catch (error) {
      console.error('Error in getPendingExpenses:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a specific expense
   */
  async getExpenseDetails(expenseId) {
    try {
      const expense = await prisma.expense.findUnique({
        where: { id: expenseId },
        include: {
          user: true,
          approvals: { orderBy: { createdAt: 'desc' } }
        }
      });

      return expense;
    } catch (error) {
      console.error('Error in getExpenseDetails:', error);
      throw error;
    }
  }

  /**
   * Check if user has permission to approve an expense
   */
  async checkApprovalPermission(userId, expenseId) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      // Only MANAGER and ADMIN can approve
      if (!['MANAGER', 'ADMIN'].includes(user.role)) {
        return false;
      }

      const expense = await prisma.expense.findUnique({
        where: { id: expenseId },
        include: { user: true }
      });

      if (!expense) {
        return false;
      }

      // If manager, check if managing the employee's department
      if (user.role === 'MANAGER') {
        // Implement department check based on your business logic
        return true; // Simplified for now
      }

      return true; // ADMIN has full permissions
    } catch (error) {
      console.error('Error checking approval permission:', error);
      return false;
    }
  }

  /**
   * Approve an expense
   */
  async approveExpense(expenseId, approvalData) {
    try {
      // Update expense status
      const expense = await prisma.expense.update({
        where: { id: expenseId },
        data: { status: 'APPROVED' },
        include: { user: true }
      });

      // Create approval record
      const approval = await prisma.approval.create({
        data: {
          expenseId: expenseId,
          approvedBy: approvalData.approvedBy,
          status: 'APPROVED',
          comments: approvalData.comments,
          timestamp: approvalData.approvalDate
        }
      });

      // Send notification to employee
      await notificationService.sendApprovalNotification(
        expense.userId,
        'APPROVED',
        {
          expenseId,
          amount: expense.amount,
          approverName: approvalData.approvedBy,
          comments: approvalData.comments
        }
      );

      return { success: true, expense, approval };
    } catch (error) {
      console.error('Error in approveExpense:', error);
      throw error;
    }
  }

  /**
   * Reject an expense
   */
  async rejectExpense(expenseId, rejectionData) {
    try {
      // Update expense status
      const expense = await prisma.expense.update({
        where: { id: expenseId },
        data: { status: 'REJECTED' },
        include: { user: true }
      });

      // Create rejection record
      const approval = await prisma.approval.create({
        data: {
          expenseId: expenseId,
          rejectedBy: rejectionData.rejectedBy,
          status: 'REJECTED',
          rejectionReason: rejectionData.rejectionReason,
          timestamp: rejectionData.rejectionDate
        }
      });

      // Send notification to employee
      await notificationService.sendApprovalNotification(
        expense.userId,
        'REJECTED',
        {
          expenseId,
          amount: expense.amount,
          rejectedBy: rejectionData.rejectedBy,
          rejectionReason: rejectionData.rejectionReason
        }
      );

      return { success: true, expense, approval };
    } catch (error) {
      console.error('Error in rejectExpense:', error);
      throw error;
    }
  }

  /**
   * Get approval history for an expense
   */
  async getApprovalHistory(expenseId) {
    try {
      const approvals = await prisma.approval.findMany({
        where: { expenseId },
        include: {
          approver: { select: { name: true, email: true, role: true } }
        },
        orderBy: { timestamp: 'desc' }
      });

      return approvals;
    } catch (error) {
      console.error('Error in getApprovalHistory:', error);
      throw error;
    }
  }

  /**
   * Get approval statistics
   */
  async getApprovalStats(userId) {
    try {
      const [pending, approved, rejected, total] = await Promise.all([
        prisma.expense.count({ where: { status: 'PENDING' } }),
        prisma.expense.count({ where: { status: 'APPROVED' } }),
        prisma.expense.count({ where: { status: 'REJECTED' } }),
        prisma.expense.count()
      ]);

      const totalAmount = await prisma.expense.aggregate({
        _sum: { amount: true }
      });

      const pendingAmount = await prisma.expense.aggregate({
        where: { status: 'PENDING' },
        _sum: { amount: true }
      });

      return {
        pending,
        approved,
        rejected,
        total,
        totalAmount: totalAmount._sum.amount || 0,
        pendingAmount: pendingAmount._sum.amount || 0,
        approvalRate: total > 0 ? ((approved / total) * 100).toFixed(2) : 0
      };
    } catch (error) {
      console.error('Error in getApprovalStats:', error);
      throw error;
    }
  }

  /**
   * Get pending count for a user
   */
  async getPendingCount(userId) {
    try {
      const count = await prisma.expense.count({
        where: { status: 'PENDING' }
      });

      return count;
    } catch (error) {
      console.error('Error in getPendingCount:', error);
      throw error;
    }
  }

  /**
   * Bulk approve multiple expenses
   */
  async bulkApprove(expenseIds, approvalData) {
    try {
      const results = [];

      for (const expenseId of expenseIds) {
        try {
          const result = await this.approveExpense(expenseId, approvalData);
          results.push({ expenseId, success: true, ...result });
        } catch (error) {
          results.push({ expenseId, success: false, error: error.message });
        }
      }

      return results;
    } catch (error) {
      console.error('Error in bulkApprove:', error);
      throw error;
    }
  }

  /**
   * Get workflow status for an expense
   */
  async getWorkflowStatus(expenseId) {
    try {
      const expense = await prisma.expense.findUnique({
        where: { id: expenseId },
        include: { approvals: { orderBy: { timestamp: 'desc' } } }
      });

      if (!expense) {
        throw new Error('Expense not found');
      }

      return {
        expenseId,
        currentStatus: expense.status,
        createdAt: expense.createdAt,
        lastUpdated: expense.updatedAt,
        approvalChain: expense.approvals
      };
    } catch (error) {
      console.error('Error in getWorkflowStatus:', error);
      throw error;
    }
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(userId, userRole) {
    try {
      const stats = await this.getApprovalStats(userId);

      return {
        ...stats,
        recentApprovals: await prisma.approval.findMany({
          where: { status: 'APPROVED' },
          include: { expense: true, approver: { select: { name: true } } },
          orderBy: { timestamp: 'desc' },
          take: 5
        }),
        pendingForApproval: await this.getPendingCount(userId)
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      throw error;
    }
  }

  /**
   * Reassign an approval to another manager
   */
  async reassignApproval(expenseId, reassignData) {
    try {
      const reassignRecord = await prisma.approvalReassignment.create({
        data: {
          expenseId,
          reassignedBy: reassignData.reassignedBy,
          reassignTo: reassignData.reassignTo,
          reason: reassignData.reason,
          timestamp: new Date()
        }
      });

      return { success: true, reassignRecord };
    } catch (error) {
      console.error('Error in reassignApproval:', error);
      throw error;
    }
  }

  /**
   * Helper function to get date range filters
   */
  getDateRangeFilter(dateRange) {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (dateRange) {
      case 'today':
        return { gte: startOfDay };
      case 'week':
        const weekAgo = new Date(startOfDay);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return { gte: weekAgo };
      case 'month':
        const monthAgo = new Date(startOfDay);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return { gte: monthAgo };
      case 'quarter':
        const quarterAgo = new Date(startOfDay);
        quarterAgo.setMonth(quarterAgo.getMonth() - 3);
        return { gte: quarterAgo };
      default:
        return {};
    }
  }
}

module.exports = new ApprovalsService();
