const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const expenseRoutes = require('./modules/expenses/expense.routes');
const approvalRoutes = require('./modules/approvals/approval.routes');
const ruleRoutes = require('./modules/rules/rule.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/rules', ruleRoutes);

// Error Handler (must be last)
app.use(errorHandler);

module.exports = app;
