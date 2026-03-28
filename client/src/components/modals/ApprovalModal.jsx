
import React from 'react';

const ApprovalModal = ({ approval, onApprove, onReject, onClose }) => {
  const [comment, setComment] = React.useState('');
  const [reason, setReason] = React.useState('');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Approval Details</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="approval-info">
            <p><strong>Employee:</strong> {approval?.expense?.employee?.name}</p>
            <p><strong>Amount:</strong> ${approval?.expense?.amount}</p>
            <p><strong>Category:</strong> {approval?.expense?.category}</p>
            <p><strong>Description:</strong> {approval?.expense?.description}</p>
          </div>

          <div className="approval-actions">
            <div className="form-group">
              <label>Comments</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comments..."
              />
            </div>

            <div className="buttons">
              <button 
                className="btn btn-success"
                onClick={() => onApprove(comment)}
              >
                Approve
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => onReject(reason)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
