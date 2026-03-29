import React, { useState } from 'react';
import './ApprovalModal.css';

const ApprovalModal = ({ isOpen, expense, actionType, onConfirm, onCancel }) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !expense) {
    return null;
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(comments);
      setComments('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isApprove = actionType === 'APPROVE';

  return (
    <>
      <div className="modal-overlay" onClick={onCancel}></div>
      <div className="approval-modal">
        <div className="modal-header">
          <h2>
            {isApprove ? '✓ Approve Expense' : '✕ Reject Expense'}
          </h2>
          <button 
            className="close-btn" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="expense-summary">
            <div className="summary-item">
              <label>Employee</label>
              <div className="value">{expense.userName}</div>
            </div>
            <div className="summary-item">
              <label>Amount</label>
              <div className="value amount">
                ${expense.amount?.toFixed(2)}
              </div>
            </div>
            <div className="summary-item">
              <label>Description</label>
              <div className="value description">{expense.description}</div>
            </div>
            <div className="summary-item">
              <label>Date</label>
              <div className="value">
                {new Date(expense.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            {expense.category && (
              <div className="summary-item">
                <label>Category</label>
                <div className="value">{expense.category}</div>
              </div>
            )}
          </div>

          <div className="comments-section">
            <label htmlFor="comments">
              {isApprove ? 'Approval Notes' : 'Rejection Reason'} (Optional)
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={
                isApprove 
                  ? 'Add any approval notes or conditions...' 
                  : 'Explain why you are rejecting this expense...'
              }
              rows="5"
              disabled={isSubmitting}
            />
            <div className="char-count">
              {comments.length}/500 characters
            </div>
          </div>

          <div className={`alert ${isApprove ? 'alert-info' : 'alert-warning'}`}>
            <strong>{isApprove ? 'Note:' : 'Warning:'}</strong>
            {isApprove 
              ? ' This action will approve the expense and notify the employee.' 
              : ' The employee will be notified of the rejection reason.'}
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={`btn ${isApprove ? 'btn-approve' : 'btn-reject'}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : (isApprove ? '✓ Approve' : '✕ Reject')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ApprovalModal;
