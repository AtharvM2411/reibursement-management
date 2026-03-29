// Approvals Validation
// Input validation for approval operations

const validateApprovalAction = (req, res, next) => {
  const { approvedBy, comments } = req.body;

  if (!approvedBy) {
    return res.status(400).json({ error: 'Approver ID is required' });
  }

  if (comments && comments.length > 500) {
    return res.status(400).json({ error: 'Comments must not exceed 500 characters' });
  }

  next();
};

const validateRejectionAction = (req, res, next) => {
  const { rejectedBy, rejectionReason } = req.body;

  if (!rejectedBy) {
    return res.status(400).json({ error: 'Rejector ID is required' });
  }

  if (!rejectionReason || rejectionReason.trim().length === 0) {
    return res.status(400).json({ error: 'Rejection reason is required' });
  }

  if (rejectionReason.length > 500) {
    return res.status(400).json({ error: 'Rejection reason must not exceed 500 characters' });
  }

  next();
};

module.exports = {
  validateApprovalAction,
  validateRejectionAction
};
