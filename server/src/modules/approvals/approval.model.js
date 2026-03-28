const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema(
  {
    expense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
      required: true,
    },
    approver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    comment: String,
    rejectionReason: String,
    approvalDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Approval', approvalSchema);
