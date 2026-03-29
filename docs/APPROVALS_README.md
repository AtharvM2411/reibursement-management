# Reimbursement Management - Approvals System

## 📋 Overview

The Approvals System is a comprehensive module for managing expense approvals in the Reimbursement Management application. It enables managers and administrators to review, approve, or reject employee expense reports with complete audit trails, notifications, and analytics.

## ✨ Key Features

### Core Functionality
- ✅ **Expense Review**: View and review pending expenses for approval
- ✅ **Approval/Rejection**: Approve or reject expenses with optional comments
- ✅ **Filtering & Search**: Filter by status, date range, and search by employee name/ID
- ✅ **Bulk Actions**: Approve multiple expenses at once
- ✅ **Reassignment**: Reassign approvals to other managers
- ✅ **Audit Trail**: Complete history of all approval actions
- ✅ **Statistics**: Real-time approval metrics and analytics
- ✅ **Role-Based Access**: MANAGER and ADMIN roles only

### User Interface
- 🎨 Professional, responsive design
- 📱 Mobile-friendly layout
- 🔍 Advanced filtering and search
- 📊 Statistics and metrics dashboard
- 📋 Sortable data tables
- 🎯 Intuitive modal-based actions

### Security
- 🔐 JWT authentication required
- 👮 Role-based authorization
- 🚫 Cannot approve own expenses
- 📝 Complete audit logging
- 🔒 Input validation and sanitization

## 🏗️ Architecture

### Frontend Stack
- **React 18+** - UI framework
- **React Hooks** - State management
- **CSS3** - Styling
- **Fetch API** - HTTP requests

### Backend Stack
- **Node.js/Express** - Server framework
- **Prisma** - ORM
- **SQLite** - Database (can switch to PostgreSQL)
- **JWT** - Authentication

### Database Schema

```
User
├── id: UUID
├── name: String
├── email: String
├── password: String (hashed)
└── role: String (ADMIN, MANAGER, EMPLOYEE)

Expense
├── id: UUID
├── amount: Float
├── currency: String
├── description: String
├── status: String (PENDING, APPROVED, REJECTED, UNDER_REVIEW)
├── category: String
├── userId: FK (User)
└── createdAt: DateTime

Approval
├── id: UUID
├── expenseId: FK (Expense)
├── status: String (APPROVED, REJECTED, PENDING)
├── approvedBy: FK (User)
├── comments: String
├── rejectedBy: FK (User)
├── rejectionReason: String
└── timestamp: DateTime

ApprovalReassignment
├── id: UUID
├── expenseId: FK (Expense)
├── reassignedBy: String
├── reassignTo: String
├── reason: String
└── timestamp: DateTime
```

## 📦 Installation

### Prerequisites
- Node.js 16+
- npm 8+
- SQLite3 (or PostgreSQL)

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Run database migration
npx prisma migrate dev --name add_approvals

# Generate Prisma client
npx prisma generate

# Start server
npm start
```

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Usage

### Accessing the Approvals Page

1. Log in with MANAGER or ADMIN account
2. Navigate to `/approvals`
3. View pending expenses and take action

### Approving an Expense

```javascript
1. Click "✓ Approve" button on the expense row
2. Modal dialog opens showing expense details
3. Optionally add approval comments (max 500 chars)
4. Click "✓ Approve" to confirm
5. Notification sent to employee
6. Expense status updated to APPROVED
```

### Rejecting an Expense

```javascript
1. Click "✕ Reject" button on the expense row
2. Modal dialog opens showing expense details
3. Enter rejection reason (required, max 500 chars)
4. Click "✕ Reject" to confirm
5. Notification sent to employee with reason
6. Expense status updated to REJECTED
```

### Using Filters

```javascript
// By Status
- Click Status dropdown
- Select: PENDING, APPROVED, REJECTED, or ALL

// By Date Range
- Click Date Range dropdown
- Select: Today, This Week, This Month, This Quarter, All Time

// By Search
- Enter employee name or expense ID in search field
- Results filter in real-time
```

## 🔌 API Reference

### GET Endpoints

#### Get Pending Expenses
```http
GET /api/approvals/pending?status=PENDING&dateRange=week&search=john
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
[
  {
    "id": "uuid",
    "amount": 250.50,
    "currency": "USD",
    "description": "Client meeting lunch",
    "status": "PENDING",
    "category": "Meals",
    "createdAt": "2026-03-29T10:30:00Z",
    "userName": "John Doe",
    "userEmail": "john@company.com"
  }
]
```

#### Get Approval Statistics
```http
GET /api/approvals/stats
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
{
  "pending": 12,
  "approved": 145,
  "rejected": 8,
  "total": 165,
  "totalAmount": 5420.75,
  "pendingAmount": 1200.00,
  "approvalRate": "87.88"
}
```

#### Get Approval History
```http
GET /api/approvals/history/:expenseId
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
[
  {
    "id": "uuid",
    "status": "APPROVED",
    "approvedBy": "manager-id",
    "comments": "Looks good",
    "timestamp": "2026-03-29T15:45:00Z"
  }
]
```

### POST Endpoints

#### Approve Expense
```http
POST /api/approvals/approve/:expenseId
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

Request:
{
  "approvedBy": "manager-id",
  "comments": "Approved"
}

Response: 200 OK
{
  "success": true,
  "expense": {...},
  "approval": {...}
}
```

#### Reject Expense
```http
POST /api/approvals/reject/:expenseId
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

Request:
{
  "rejectedBy": "manager-id",
  "rejectionReason": "Receipt missing"
}

Response: 200 OK
{
  "success": true,
  "expense": {...},
  "approval": {...}
}
```

#### Bulk Approve
```http
POST /api/approvals/bulk-approve
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

Request:
{
  "expenseIds": ["id1", "id2", "id3"],
  "comments": "Bulk approved"
}

Response: 200 OK
[
  { "expenseId": "id1", "success": true, ... },
  { "expenseId": "id2", "success": true, ... },
  { "expenseId": "id3", "success": false, "error": "..." }
]
```

## 🧩 Components Reference

### Approvals (Page Component)

Main page component managing the approvals workflow.

```javascript
import Approvals from './pages/approvals/Approvals';

<Approvals />
```

**Features:**
- Role-based access control
- Filter and search functionality
- Statistics display
- Modal-based actions
- Error handling

### ApprovalsTable (Data Table Component)

Displays expenses in a sortable, filterable table.

```javascript
import ApprovalsTable from './components/tables/ApprovalsTable';

<ApprovalsTable
  expenses={expenses}
  onApprove={handleApprove}
  onReject={handleReject}
  loading={loading}
/>
```

**Props:**
- `expenses: Expense[]` - Array of expenses to display
- `onApprove: (expense) => void` - Approve handler
- `onReject: (expense) => void` - Reject handler
- `loading: boolean` - Loading state

### ApprovalModal (Modal Component)

Modal dialog for confirming approval or rejection.

```javascript
import ApprovalModal from './components/modals/ApprovalModal';

<ApprovalModal
  isOpen={isOpen}
  expense={selectedExpense}
  actionType={'APPROVE'} // or 'REJECT'
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

**Props:**
- `isOpen: boolean` - Modal visibility
- `expense: Expense` - Expense details
- `actionType: 'APPROVE' | 'REJECT'` - Action type
- `onConfirm: (comments) => void` - Confirm handler
- `onCancel: () => void` - Cancel handler

## 🎣 Hooks Reference

### useApprovals Hook

Custom hook for managing approvals state and operations.

```javascript
import { useApprovals } from './hooks/useApprovals';

const MyComponent = () => {
  const {
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
    resetFilters
  } = useApprovals();

  // Use hook methods...
};
```

**Methods:**
- `fetchExpenses()` - Load pending expenses
- `fetchStats()` - Load statistics
- `approveExpense(id, comments)` - Approve an expense
- `rejectExpense(id, reason)` - Reject an expense
- `updateFilters(newFilters)` - Update filter state
- `resetFilters()` - Reset to default filters

## 🛠️ Utility Functions

### approvalUtils.js

Helper functions and constants for approvals.

```javascript
import {
  APPROVAL_STATUS,
  EXPENSE_STATUS,
  USER_ROLES,
  formatCurrency,
  formatDate,
  formatDateTime,
  canApprove,
  getStatusBadgeClass,
  getExpenseStatistics,
  sortExpenses,
  validateRejectionReason
} from './utils/approvalUtils';

// Usage examples
const formatted = formatCurrency(150.50); // "$150.50"
const date = formatDate(new Date()); // "Mar 29, 2026"
const canAct = canApprove(user.role); // true if MANAGER/ADMIN
```

## 🔐 Security & Permissions

### Role-Based Access

| Feature | ADMIN | MANAGER | EMPLOYEE |
|---------|-------|---------|----------|
| Access Approvals Page | ✓ | ✓ | ✗ |
| View Pending Expenses | ✓ | ✓ | ✗ |
| Approve Expenses | ✓ | ✓ | ✗ |
| Reject Expenses | ✓ | ✓ | ✗ |
| View All Approvals | ✓ | ✓ | ✗ |
| Reassign Approvals | ✓ | ✓ | ✗ |

### Authorization Rules

1. **Authentication**: JWT token required on all requests
2. **Role Check**: Only MANAGER and ADMIN can access
3. **Self-Approval Block**: Cannot approve own expenses
4. **Status Validation**: Can only approve PENDING expenses
5. **Audit Logging**: All actions logged with user attribution

## 📊 Monitoring & Analytics

### Key Metrics

- **Approval Rate**: Percentage of approved vs total expenses
- **Rejection Rate**: Percentage of rejected expenses
- **Avg Processing Time**: Time from submission to approval/rejection
- **Pending Amount**: Total amount in PENDING status
- **Pending Count**: Number of pending approval

### Dashboard Statistics

```javascript
{
  pending: 12,          // Number of pending expenses
  approved: 145,        // Total approved
  rejected: 8,          // Total rejected
  totalAmount: 5420.75, // Total amount across all
  pendingAmount: 1200,  // Amount awaiting approval
  approvalRate: "87.88" // Approval percentage
}
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Access Denied on Approvals Page
- **Solution**: Verify user role is MANAGER or ADMIN in database

**Issue**: Expenses not appearing
- **Cause**: Wrong status or date filter
- **Solution**: Check expense status is PENDING

**Issue**: API returns 500 errors
- **Cause**: Database migration not run
- **Solution**: Run `npx prisma migrate dev`

**Issue**: Cannot approve any expense
- **Cause**: Trying to approve own expense
- **Solution**: Approvals must be done by different user

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for more troubleshooting.

## 📚 Documentation

- **[APPROVALS_SYSTEM_DESIGN.md](./APPROVALS_SYSTEM_DESIGN.md)** - Comprehensive system design
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Setup and integration instructions
- **[API.md](../README.md)** - Full API documentation

## 🎯 Future Enhancements

- [ ] Multi-level approval workflows
- [ ] Custom approval routing
- [ ] SLA tracking and alerts
- [ ] Approval delegation
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Mobile app support
- [ ] Webhook integrations
- [ ] Bulk import functionality
- [ ] Approval templates

## 📄 License

This project is part of the Reimbursement Management System.

## 👥 Support

For issues, questions, or suggestions, please contact the development team.

---

**Last Updated**: March 29, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
