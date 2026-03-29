# Approvals System - Integration Guide

## Quick Start Setup

### Step 1: Database Migration

```bash
cd server
npx prisma migrate dev --name add_approvals
npx prisma generate
```

This creates:
- `Approval` table for tracking approvals/rejections
- `ApprovalReassignment` table for tracking reassignments
- Updated relationships in `User` and `Expense` tables

### Step 2: Update Server Routes

Add the approvals router to `server/src/routes/index.js`:

```javascript
const express = require('express');
const router = express.Router();

// Import routes
const approvalRoutes = require('../modules/approvals/approval.routes');

// Register routes
router.use('/approvals', approvalRoutes);

module.exports = router;
```

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
```

No additional dependencies needed - uses existing React setup.

### Step 4: Configure Frontend

#### Import Approvals Route

In `client/src/routes.jsx` or your routing configuration:

```javascript
import Approvals from './pages/approvals/Approvals';

const routes = [
  // ... other routes
  {
    path: '/approvals',
    element: <Approvals />,
    name: 'Approvals',
    requiresAuth: true,
    requiredRoles: ['MANAGER', 'ADMIN']
  }
];
```

#### Import ApprovalsService

In `client/src/services/index.js`:

```javascript
export { default as approvalsService } from './approvalsService';
```

### Step 5: Add Navigation Link

Update your navigation/menu component:

```javascript
import { useAuth } from './hooks/useAuth';

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav>
      {/* ... other links */}
      {['MANAGER', 'ADMIN'].includes(user?.role) && (
        <a href="/approvals">Approvals</a>
      )}
    </nav>
  );
};
```

## File Structure Reference

### Frontend Files Created

```
client/src/
├── pages/
│   └── approvals/
│       ├── Approvals.jsx          (Main page component)
│       └── Approvals.css           (Styles)
├── components/
│   ├── tables/
│   │   ├── ApprovalsTable.jsx      (Data table component)
│   │   └── ApprovalsTable.css      (Styles)
│   └── modals/
│       ├── ApprovalModal.jsx       (Modal dialog component)
│       └── ApprovalModal.css       (Styles)
├── services/
│   └── approvalsService.js         (API service)
├── hooks/
│   └── useApprovals.js             (Custom hook)
└── utils/
    └── approvalUtils.js            (Utility functions)
```

### Backend Files Created

```
server/src/
├── modules/
│   └── approvals/
│       ├── approval.controller.js  (Request handlers)
│       ├── approval.service.js     (Business logic)
│       ├── approval.routes.js      (API routes)
│       ├── approval.validation.js  (Input validation)
│       └── approval.utils.js       (Helper utilities)
└── prisma/
    └── schema.prisma               (Updated database schema)
```

## Configuration

### Environment Variables

No new environment variables required. Uses existing:
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - For authentication
- `PORT` - Server port

### API Base URL

Update in `client/src/services/approvalsService.js` if needed:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
```

## Testing the System

### 1. Create Test Data

Create expenses with PENDING status:

```bash
# Using your existing API
curl -X POST http://localhost:3000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.00,
    "currency": "USD",
    "description": "Client meeting supplies",
    "category": "Office Supplies"
  }'
```

### 2. Test Approval Flow

Access `/approvals` with a MANAGER or ADMIN account:

```
1. Navigate to http://localhost:3000/approvals
2. View pending expenses
3. Click "Approve" on an expense
4. Add comments and confirm
5. Check that expense status changed to APPROVED
```

### 3. Test Rejection Flow

```
1. Click "Reject" on a PENDING expense
2. Enter rejection reason
3. Confirm rejection
4. Check that expense status changed to REJECTED
```

### 4. Test Filters

```
1. Filter by status (PENDING, APPROVED, REJECTED)
2. Filter by date range (Today, This Week, etc.)
3. Search by employee name or expense ID
4. Verify results are filtered correctly
```

## Authorization Rules

### Access Control

| Route | ADMIN | MANAGER | EMPLOYEE |
|-------|-------|---------|----------|
| GET /approvals/pending | ✓ | ✓ | ✗ |
| GET /approvals/stats | ✓ | ✓ | ✗ |
| POST /approvals/approve/* | ✓ | ✓ | ✗ |
| POST /approvals/reject/* | ✓ | ✓ | ✗ |

### Business Rules

- **Approval**: Only MANAGER/ADMIN can approve
- **Self-Approval**: Users cannot approve their own expenses
- **Visibility**: Can only approve expenses in PENDING status
- **Audit**: All actions are logged with timestamps and user attribution

## Troubleshooting

### Issue: "Access Denied" on approvals page

**Cause**: User doesn't have MANAGER or ADMIN role

**Solution**: 
- Verify user role in database: `SELECT role FROM User WHERE id='user-id';`
- Update if needed: `UPDATE User SET role='MANAGER' WHERE id='user-id';`

### Issue: Expenses not appearing in approvals list

**Cause**: Expenses have wrong status or date filtering issue

**Solution**:
- Check expense status: `SELECT status FROM Expense WHERE id='expense-id';`
- Verify date filters are set correctly
- Check that status = 'PENDING'

### Issue: API returns 500 errors

**Cause**: Database schema not migrated or connection issue

**Solution**:
```bash
# Re-run migration
npx prisma migrate deploy
# Or recreate database
npx prisma migrate reset
```

### Issue: Notifications not sending

**Cause**: Notification service not configured

**Solution**:
- Implement notification service in `server/src/modules/notifications/`
- Or disable in `approval.service.js` line 60:
```javascript
// Comment out notification line if service not available
// await notificationService.sendApprovalNotification(...)
```

## Performance Optimization

### For Large Datasets

1. **Add Pagination**:
```javascript
// Update approvalsService.js getPendingExpenses
const page = req.query.page || 1;
const limit = req.query.limit || 20;
const skip = (page - 1) * limit;

const expenses = await prisma.expense.findMany({
  where: whereClause,
  include: { user: true, approvals: true },
  orderBy: { createdAt: 'desc' },
  take: limit,
  skip: skip
});
```

2. **Add Caching**:
```javascript
// Cache approval stats for 5 minutes
const getCachedStats = cache(
  () => this.getApprovalStats(),
  { ttl: 5 * 60 * 1000 }
);
```

3. **Database Indexes**:
Indexes are already added in schema for:
- `expenseId` in Approval table
- `approvedBy`, `rejectedBy` in Approval table

## Security Considerations

1. **Input Validation**: All inputs validated in `approval.validation.js`
2. **Authorization**: Role-based access control enforced
3. **Authentication**: JWT tokens verified on all endpoints
4. **Audit Trail**: All actions logged with user attribution
5. **Data Privacy**: Comments and rejections only visible to authorized users

## Monitoring & Logging

### Add Logging

Update `approval.controller.js` to log actions:

```javascript
const logger = require('../../utils/logger');

async approveExpense(req, res) {
  try {
    logger.info(`Approving expense ${expenseId}`, { 
      userId: req.user.id, 
      timestamp: new Date() 
    });
    // ... rest of code
  }
}
```

## Next Steps

1. **Test thoroughly** with sample data
2. **Set up monitoring** for approval metrics
3. **Configure notifications** (email/in-app)
4. **Implement SLA tracking** if needed
5. **Add analytics dashboard** for approval metrics

---

**Last Updated**: March 29, 2026
**Version**: 1.0
