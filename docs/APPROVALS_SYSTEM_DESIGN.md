# Approvals Logic System - Complete Design Documentation

## Overview
This document describes the comprehensive approvals logic system for the Reimbursement Management application. The system enables managers and administrators to review, approve, or reject employee expense reports with comprehensive tracking and audit capabilities.

## Table of Contents
1. [Architecture](#architecture)
2. [Data Models](#data-models)
3. [Approval Workflow](#approval-workflow)
4. [Key Features](#key-features)
5. [API Endpoints](#api-endpoints)
6. [Frontend Components](#frontend-components)
7. [Security & Authorization](#security--authorization)
8. [Status Codes & Error Handling](#status-codes--error-handling)

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────┤
│  ├─ Pages: Approvals.jsx                                    │
│  ├─ Components: ApprovalsTable, ApprovalModal               │
│  ├─ Services: approvalsService.js                           │
│  └─ Hooks: useAuth                                          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Requests
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                        │
├─────────────────────────────────────────────────────────────┤
│  ├─ Routes: approval.routes.js                              │
│  ├─ Controller: approval.controller.js                      │
│  ├─ Service: approval.service.js                            │
│  ├─ Validation: approval.validation.js                      │
│  └─ Middleware: authMiddleware, roleMiddleware              │
└────────────────────────┬────────────────────────────────────┘
                         │ Database Queries
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (Prisma)                         │
├─────────────────────────────────────────────────────────────┤
│  ├─ User (extended)                                         │
│  ├─ Expense (extended)                                      │
│  ├─ Approval (new)                                          │
│  └─ ApprovalReassignment (new)                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### User Model (Extended)
```javascript
{
  id: String (UUID),
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ("ADMIN", "MANAGER", "EMPLOYEE"),
  createdAt: DateTime,
  updatedAt: DateTime,
  
  // Relations
  expenses: Expense[],
  approvalsGiven: Approval[],
  approvalsRejected: Approval[]
}
```

### Expense Model (Extended)
```javascript
{
  id: String (UUID),
  amount: Float,
  currency: String,
  description: String,
  status: String ("PENDING", "APPROVED", "REJECTED", "UNDER_REVIEW"),
  category: String (optional),
  userId: String (FK),
  createdAt: DateTime,
  updatedAt: DateTime,
  
  // Relations
  user: User,
  approvals: Approval[],
  reassignments: ApprovalReassignment[]
}
```

### Approval Model (New)
```javascript
{
  id: String (UUID),
  expenseId: String (FK),
  status: String ("APPROVED", "REJECTED", "PENDING"),
  
  // Approval details
  approvedBy: String (FK - User ID, nullable),
  comments: String (optional),
  
  // Rejection details
  rejectedBy: String (FK - User ID, nullable),
  rejectionReason: String (optional),
  
  timestamp: DateTime,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### ApprovalReassignment Model (New)
```javascript
{
  id: String (UUID),
  expenseId: String (FK),
  reassignedBy: String (User ID),
  reassignTo: String (Target Manager/Approver ID),
  reason: String (optional),
  timestamp: DateTime,
  createdAt: DateTime
}
```

## Approval Workflow

### Standard Approval Flow

```
┌─────────────────┐
│   PENDING       │  (Initial status when expense is created)
└────────┬────────┘
         │
         ├─→ [APPROVED] ──→ [COMPLETED]
         │     (Manager/Admin approves)
         │
         ├─→ [REJECTED] ──→ [NEEDS REVISION]
         │     (Manager/Admin rejects with reason)
         │
         └─→ [UNDER_REVIEW]
               (Complex expenses requiring multiple approvals)
```

### Multi-Level Approval (For high-value or complex expenses)
```
PENDING → MANAGER_APPROVAL → ADMIN_APPROVAL → APPROVED
                  ↓                ↓
            [REJECTED]        [REJECTED]
```

## Key Features

### 1. **Filter & Search**
- Filter by status (PENDING, APPROVED, REJECTED)
- Filter by date range (Today, This Week, This Month, This Quarter)
- Search by employee name or expense ID

### 2. **Approval Actions**
- **Approve**: Mark expense as approved with optional comments
- **Reject**: Mark expense as rejected with mandatory reason
- **Reassign**: Reassign approval to another manager
- **Bulk Approve**: Approve multiple expenses at once

### 3. **Audit Trail**
- Complete history of all approval actions
- Timestamps for each action
- Comments and reasons tracked
- User attribution for all actions

### 4. **Notifications**
- Employee notified when expense is approved
- Employee notified when expense is rejected with reason
- Manager receives pending approval count

### 5. **Statistics & Dashboard**
- Total pending expenses count
- Total pending amount
- Approval rates
- Recent approval history
- Trend analysis

### 6. **Authorization & Access Control**
- Only MANAGER and ADMIN roles can access approvals page
- Department-based filtering for managers
- Admin visibility across all departments
- View without edit permissions for specific roles

## API Endpoints

### Base URL
```
/api/approvals
```

### Endpoints

#### GET /pending
**Description**: Get all pending expenses for approval
**Query Parameters**:
- `status` (optional): Filter by status (PENDING, APPROVED, REJECTED, all)
- `search` (optional): Search term for employee name or expense ID
- `dateRange` (optional): Date range (all, today, week, month, quarter)

**Response**:
```json
[
  {
    "id": "uuid",
    "amount": 250.50,
    "currency": "USD",
    "description": "Client meeting lunch",
    "status": "PENDING",
    "category": "Meals",
    "createdAt": "2026-03-29T10:30:00Z",
    "userId": "user-uuid",
    "userName": "John Doe",
    "userEmail": "john@company.com"
  }
]
```

#### GET /expenses/:expenseId
**Description**: Get detailed information about a specific expense
**Parameters**: `expenseId` (path)
**Response**: Full expense object with approval history

#### GET /history/:expenseId
**Description**: Get approval history for an expense
**Response**:
```json
[
  {
    "id": "uuid",
    "status": "APPROVED",
    "approvedBy": "manager-id",
    "comments": "Approved as discussed",
    "timestamp": "2026-03-29T15:45:00Z"
  }
]
```

#### GET /stats
**Description**: Get approval statistics
**Response**:
```json
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

#### GET /pending-count
**Description**: Get count of pending approvals
**Response**: `{ "count": 12 }`

#### GET /workflow/:expenseId
**Description**: Get workflow status for an expense
**Response**:
```json
{
  "expenseId": "uuid",
  "currentStatus": "APPROVED",
  "createdAt": "2026-03-29T10:30:00Z",
  "lastUpdated": "2026-03-29T15:45:00Z",
  "approvalChain": [...]
}
```

#### GET /dashboard/stats
**Description**: Get comprehensive dashboard statistics
**Response**: Combined stats with recent approvals

#### POST /approve/:expenseId
**Description**: Approve an expense
**Body**:
```json
{
  "approvedBy": "manager-id",
  "comments": "Looks good"
}
```
**Response**: `{ "success": true, "expense": {...}, "approval": {...} }`

#### POST /reject/:expenseId
**Description**: Reject an expense
**Body**:
```json
{
  "rejectedBy": "manager-id",
  "rejectionReason": "Receipt missing"
}
```
**Response**: `{ "success": true, "expense": {...}, "approval": {...} }`

#### POST /bulk-approve
**Description**: Approve multiple expenses
**Body**:
```json
{
  "expenseIds": ["id1", "id2", "id3"],
  "comments": "Bulk approved"
}
```
**Response**: Array of results for each expense

#### POST /reassign/:expenseId
**Description**: Reassign an approval to another manager
**Body**:
```json
{
  "reassignTo": "other-manager-id",
  "reason": "Conflict of interest"
}
```

## Frontend Components

### Approvals.jsx
**Main Page Component**
- Manages state for expenses, filters, and modals
- Handles fetch and approval actions
- Provides role-based access control
- Displays statistics and filtered data

**Key Props/State**:
- `expenses`: Array of expense objects
- `filters`: { status, searchTerm, dateRange }
- `selectedExpense`: Current expense being reviewed
- `isModalOpen`: Modal visibility state
- `actionType`: 'APPROVE' or 'REJECT'

### ApprovalsTable.jsx
**Data Table Component**
- Displays expenses in tabular format
- Shows employee info, amounts, dates, and status
- Action buttons for approve/reject
- Status badges
- Responsive design

**Props**:
- `expenses`: Array of expenses to display
- `onApprove`: Callback for approve action
- `onReject`: Callback for reject action
- `loading`: Loading state

### ApprovalModal.jsx
**Modal Dialog Component**
- Shows expense summary
- Input field for comments/reasons
- Confirmation buttons
- Character count for inputs
- Alert messages based on action type

**Props**:
- `isOpen`: Modal visibility
- `expense`: Expense being reviewed
- `actionType`: 'APPROVE' or 'REJECT'
- `onConfirm`: Callback with user comments
- `onCancel`: Callback to close modal

## Security & Authorization

### Authentication
- All endpoints require authentication (authMiddleware)
- JWT tokens in request headers
- User context attached to all requests

### Authorization
- Role-based access control (roleMiddleware)
- MANAGER and ADMIN roles required for approval endpoints
- GET endpoints accessible to authorized managers
- Approval actions logged with user attribution

### Input Validation
- Approval action validation
- Rejection action validation
- Comment/reason length limits (max 500 chars)
- Expense ID validation
- User permission checks

### Data Privacy
- Employees cannot approve their own expenses
- Audit trail independent of data modifications
- Approval records immutable once created
- Comments visible only to authorized users

## Status Codes & Error Handling

### Success Responses
- **200 OK**: Successful GET/read operations
- **201 Created**: Successful POST/creation operations
- **204 No Content**: Successful operations with no response body

### Error Responses
- **400 Bad Request**: Invalid input parameters
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

### Common Error Cases

| Scenario | Status | Message |
|----------|--------|---------|
| Missing expense ID | 400 | "Expense ID is required" |
| Unauthorized role | 403 | "Unauthorized to approve this expense" |
| Missing reason for rejection | 400 | "Rejection reason is required" |
| Invalid approval data | 400 | "Approver ID is required" |
| Expense not found | 404 | "Expense not found" |

## Setup Instructions

### Database Migration
```bash
# Install dependencies
npm install

# Run migration
npx prisma migrate dev --name add_approvals

# Generate Prisma client
npx prisma generate
```

### Backend Setup
1. Register approval routes in `server/src/routes/index.js`:
```javascript
const approvalRoutes = require('./modules/approvals/approval.routes');
router.use('/approvals', approvalRoutes);
```

2. Ensure middleware is configured:
- `authMiddleware` checks JWT tokens
- `roleMiddleware` validates user roles

### Frontend Setup
1. Ensure `approvalsService` importable from services
2. Add route to approvals page in router configuration
3. Import and use components in your routing setup

## Testing

### Unit Tests for Backend
- Test approval service methods
- Test controller request handling
- Test authorization checks
- Test validation logic

### Integration Tests
- Test full approval workflow
- Test API endpoints
- Test database operations
- Test notification triggers

### Frontend Tests
- Test component rendering
- Test user interactions
- Test API service calls
- Test error handling

## Future Enhancements

1. **Multi-level Approvals**: Require sequential approvals from multiple managers
2. **Custom Workflows**: Configurable approval chains per expense category
3. **SLA Tracking**: Track approval time and enforce SLAs
4. **Delegation**: Allow managers to delegate approval authority
5. **Analytics**: Enhanced reporting and analytics dashboard
6. **Mobile App**: Mobile interface for on-the-go approvals
7. **Email Notifications**: Detailed email notifications
8. **Webhook Integrations**: Connect to external systems
9. **Approval Templates**: Predefined comment templates
10. **Bulk Import**: Support for bulk expense uploads

## Troubleshooting

### Common Issues

**Issue**: "Not authorized to approve this expense"
- **Cause**: User role is not MANAGER or ADMIN
- **Solution**: Check user role in database and authentication token

**Issue**: Approvals not showing up
- **Cause**: Expenses haven't been created or filtered wrong
- **Solution**: Check expense status and filter date ranges

**Issue**: Rejection reason not saved
- **Cause**: Empty rejection reason submitted
- **Solution**: Validation should prevent empty reasons (check client side)

**Issue**: API returning 500 errors
- **Cause**: Database connection or query errors
- **Solution**: Check Prisma connection and database schema

---

**Last Updated**: March 29, 2026
**Version**: 1.0
**Author**: Reimbursement Management System
