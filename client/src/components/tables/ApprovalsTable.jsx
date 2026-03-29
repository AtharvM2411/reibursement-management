import React from 'react';
import './ApprovalsTable.css';

const ApprovalsTable = ({ expenses, onApprove, onReject, loading }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'PENDING': 'badge-warning',
      'APPROVED': 'badge-success',
      'REJECTED': 'badge-danger',
      'UNDER_REVIEW': 'badge-info'
    };
    return <span className={`badge ${statusColors[status] || 'badge-default'}`}>{status}</span>;
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses to review</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="approvals-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className={`status-${expense.status?.toLowerCase()}`}>
              <td className="employee-cell">
                <div className="employee-info">
                  <div className="employee-avatar">{expense.userName?.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="employee-name">{expense.userName}</div>
                    <div className="employee-email">{expense.userEmail}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="description-cell">
                  {expense.description}
                </div>
              </td>
              <td className="amount-cell">
                <strong>{formatCurrency(expense.amount)}</strong>
              </td>
              <td>{formatDate(expense.createdAt)}</td>
              <td>{getStatusBadge(expense.status)}</td>
              <td>{expense.category || 'Uncategorized'}</td>
              <td className="actions-cell">
                {expense.status === 'PENDING' && (
                  <div className="action-buttons">
                    <button
                      className="btn btn-approve"
                      onClick={() => onApprove(expense)}
                      title="Approve"
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => onReject(expense)}
                      title="Reject"
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}
                {expense.status !== 'PENDING' && (
                  <div className="action-detail">
                    <small className="approved-by">
                      {expense.status === 'APPROVED' ? `Approved by: ${expense.approvedBy}` : `Rejected by: ${expense.rejectedBy}`}
                    </small>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalsTable;
