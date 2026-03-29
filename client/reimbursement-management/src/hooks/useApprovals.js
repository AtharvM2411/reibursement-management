import { useState, useCallback } from 'react';
import approvalsService from '../services/approvalsService';

/**
 * Custom hook for managing approvals state and operations
 */
export const useApprovals = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'PENDING',
    searchTerm: '',
    dateRange: 'all'
  });
  const [stats, setStats] = useState(null);

  /**
   * Fetch pending expenses
   */
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await approvalsService.getPendingExpenses(filters);
      setExpenses(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch expenses');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Fetch approval statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      const data = await approvalsService.getApprovalStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  /**
   * Approve an expense
   */
  const approveExpense = useCallback(async (expenseId, comments) => {
    try {
      setLoading(true);
      const result = await approvalsService.approveExpense(expenseId, {
        comments
      });
      await fetchExpenses();
      return result;
    } catch (err) {
      setError(err.message || 'Failed to approve expense');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchExpenses]);

  /**
   * Reject an expense
   */
  const rejectExpense = useCallback(async (expenseId, rejectionReason) => {
    try {
      setLoading(true);
      const result = await approvalsService.rejectExpense(expenseId, {
        rejectionReason
      });
      await fetchExpenses();
      return result;
    } catch (err) {
      setError(err.message || 'Failed to reject expense');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchExpenses]);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters({
      status: 'PENDING',
      searchTerm: '',
      dateRange: 'all'
    });
  }, []);

  return {
    expenses,
    loading,
    error,
    filters,
    stats,
    fetchExpenses,
    fetchStats,
    approveExpense,
    rejectExpense,
    updateFilters,
    resetFilters,
    setError
  };
};

export default useApprovals;
