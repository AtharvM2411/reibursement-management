const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
    receiptUrl: String,
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'rejected', 'reimbursed'],
      default: 'draft',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectionReason: String,
    submitDate: Date,
    approvalDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
