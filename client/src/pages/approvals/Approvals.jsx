import React, { useState, useEffect } from 'react';
import ApprovalsTable from '../../components/tables/ApprovalsTable';
import ApprovalModal from '../../components/modals/ApprovalModal';
import { useAuth } from '../../hooks/useAuth';
import { approvalsService } from '../../services/approvalsService';
import './Approvals.css';

const Approvals = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'PENDING',
    searchTerm: '',
    dateRange: 'all'
  });
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'APPROVE' or 'REJECT'

  useEffect(() => {
    fetchPendingExpenses();
  }, [filters]);

  const fetchPendingExpenses = async () => {
    try {
      setLoading(true);
      const data = await approvalsService.getPendingExpenses(filters);
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses for approval');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (expense) => {
    setSelectedExpense(expense);
    setActionType('APPROVE');
    setIsModalOpen(true);
  };

  const handleReject = (expense) => {
    setSelectedExpense(expense);
    setActionType('REJECT');
    setIsModalOpen(true);
  };

  const handleConfirmAction = async (comments) => {
    try {
      setLoading(true);
      if (actionType === 'APPROVE') {
        await approvalsService.approveExpense(selectedExpense.id, {
          approvedBy: user.id,
          comments
        });
      } else {
        await approvalsService.rejectExpense(selectedExpense.id, {
          rejectedBy: user.id,
          rejectionReason: comments
        });
      }
      
      setIsModalOpen(false);
      setSelectedExpense(null);
      setActionType(null);
      await fetchPendingExpenses();
    } catch (err) {
      setError(`Failed to ${actionType.toLowerCase()} expense`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleDateRangeChange = (dateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  if (!user || !['MANAGER', 'ADMIN'].includes(user.role)) {
    return (
      <div className="approvals-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Only managers and admins can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="approvals-container">
      <div className="approvals-header">
        <h1>Expense Approvals</h1>
        <p className="subtitle">Review and approve pending expense reports</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="approvals-filters">
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filters.status} 
            onChange={(e) => handleStatusFilterChange(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range:</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>

        <div className="filter-group search">
          <input
            type="text"
            placeholder="Search by employee name or expense ID..."
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading expenses...</div>
      ) : (
        <>
          <div className="approvals-stats">
            <div className="stat-card">
              <div className="stat-label">Total Pending</div>
              <div className="stat-value">{expenses.filter(e => e.status === 'PENDING').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Amount</div>
              <div className="stat-value">
                ${expenses.reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(2)}
              </div>
            </div>
          </div>

          <ApprovalsTable
            expenses={expenses}
            onApprove={handleApprove}
            onReject={handleReject}
            loading={loading}
          />
        </>
      )}

      <ApprovalModal
        isOpen={isModalOpen}
        expense={selectedExpense}
        actionType={actionType}
        onConfirm={handleConfirmAction}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedExpense(null);
          setActionType(null);
        }}
      />
    </div>
  );
};

export default Approvals;
