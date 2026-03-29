# Approvals System - Architecture Overview

## Complete System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          REIMBURSEMENT MANAGEMENT                          │
│                        APPROVALS SYSTEM - ARCHITECTURE                     │
└────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────────┐
                              │    FRONTEND UI      │
                              │   (React Components)│
                              └──────────┬──────────┘
                                         │
           ┌─────────────────────────────┼─────────────────────────────┐
           │                             │                             │
    ┌─────▼────────┐          ┌─────────▼────────┐         ┌────────┴──────┐
    │  Approvals   │          │  ApprovalsTable  │         │ ApprovalModal │
    │  Page        │          │  Data Display    │         │ Confirmation  │
    │  (Container) │          │  & Actions       │         │ Dialog        │
    └─────┬────────┘          └─────────┬────────┘         └───────┬───────┘
          │                             │                          │
          └─────────────────────────────┼──────────────────────────┘
                                        │
        ┌───────────────────────────────▼────────────────────────┐
        │          API SERVICE LAYER                              │
        │  ┌─────────────────────────────────────────────────┐   │
        │  │  approvalsService.js - HTTP Requests            │   │
        │  │  ├─ getPendingExpenses()                         │   │
        │  │  ├─ approveExpense()                             │   │
        │  │  ├─ rejectExpense()                              │   │
        │  │  ├─ getApprovalStats()                           │   │
        │  │  ├─ bulkApprove()                                │   │
        │  │  └─ getApprovalHistory()                         │   │
        │  └─────────────────────────────────────────────────┘   │
        └───────────────────────────────▲────────────────────────┘
                                        │
        ┌───────────────────────────────┼────────────────────────┐
        │     UTILITY & HOOK LAYER                               │
        │  ┌─────────────────────────────────────────────────┐   │
        │  │  useApprovals.js - State Management             │   │
        │  │  approvalUtils.js - Helper Functions            │   │
        │  │  ├─ Format utilities                            │   │
        │  │  ├─ Validation functions                        │   │
        │  │  ├─ Constants & Status maps                     │   │
        │  │  └─ Statistics calculations                     │   │
        │  └─────────────────────────────────────────────────┘   │
        └───────────────────────────────┬────────────────────────┘
                                        │
        ┌───────────────────────────────▼────────────────────────┐
        │          BACKEND API LAYER (Express)                   │
        │  Base URL: /api/approvals                              │
        │  ┌─────────────────────────────────────────────────┐   │
        │  │  approval.routes.js - Endpoint Definitions      │   │
        │  │  ├─ GET /pending                                │   │
        │  │  ├─ GET /stats                                  │   │
        │  │  ├─ GET /history/:id                            │   │
        │  │  ├─ POST /approve/:id                           │   │
        │  │  ├─ POST /reject/:id                            │   │
        │  │  ├─ POST /bulk-approve                          │   │
        │  │  └─ POST /reassign/:id                          │   │
        │  └─────────────────────────────────────────────────┘   │
        └───────────────────────────────┬────────────────────────┘
                                        │
        ┌───────────────────────────────▼────────────────────────┐
        │        MIDDLEWARE & SECURITY LAYER                     │
        │  ┌─────────────────────────────────────────────────┐   │
        │  │  authMiddleware - JWT Verification              │   │
        │  │  roleMiddleware - MANAGER/ADMIN Check           │   │
        │  │  approval.validation.js - Input Validation      │   │
        │  └─────────────────────────────────────────────────┘   │
        └───────────────────────────────┬────────────────────────┘
                                        │
        ┌───────────────────────────────▼────────────────────────┐
        │          BUSINESS LOGIC LAYER (Service)                │
        │  ┌─────────────────────────────────────────────────┐   │
        │  │  approval.service.js - Core Logic               │   │
        │  │  ├─ getPendingExpenses()                         │   │
        │  │  ├─ approveExpense()                             │   │
        │  │  ├─ rejectExpense()                              │   │
        │  │  ├─ checkApprovalPermission()                    │   │
        │  │  ├─ getApprovalHistory()                         │   │
        │  │  ├─ getApprovalStats()                           │   │
        │  │  ├─ bulkApprove()                                │   │
        │  │  ├─ reassignApproval()                           │   │
        │  │  └─ Notification triggers                        │   │
        │  └─────────────────────────────────────────────────┘   │
        └───────────────────────────────┬────────────────────────┘
                                        │
        ┌───────────────────────────────▼────────────────────────┐
        │     PRISMA ORM & DATABASE LAYER                        │
        │  ┌─────────────────────────────────────────────────┐   │
        │  │  Models (Prisma Schema)                         │   │
        │  │  ├─ User (Extended)                             │   │
        │  │  ├─ Expense (Extended)                          │   │
        │  │  ├─ Approval (New)                              │   │
        │  │  └─ ApprovalReassignment (New)                  │   │
        │  └─────────────────────────────────────────────────┘   │
        └───────────────────────────────┬────────────────────────┘
                                        │
                              ┌─────────▼─────────┐
                              │   SQLite/PgSQL    │
                              │    DATABASE       │
                              │                   │
                              │ ┌───────────────┐ │
                              │ │ User Table    │ │
                              │ │ Expense Table │ │
                              │ │ Approval Tbl  │ │
                              │ │ Reassign Tbl  │ │
                              │ └───────────────┘ │
                              └───────────────────┘
```

## Data Flow Diagram

### Approval Flow

```
┌─────────────────────┐
│ Manager opens app   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Navigate to /approvals              │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Frontend loads Approvals component  │
│ - useAuth hook checks role         │
│ - Renders page if MANAGER/ADMIN    │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ useApprovals hook fires            │
│ - fetchExpenses() called            │
│ - Loading state set to true         │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ approvalsService.getPendingExpenses │
│ - Sends GET /api/approvals/pending  │
│ - Attaches JWT token                │
│ - Sends filters (status, search)    │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Backend receives request            │
│ - authMiddleware verifies JWT       │
│ - Extracts user from token          │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ approval.controller.getPendingExps  │
│ - Calls approvalsService            │
│ - Passes filters and user context   │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ approval.service.getPendingExpenses │
│ - Builds Prisma query               │
│ - Applies filters (status, date)    │
│ - Joins user and approval data      │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Database Query (Prisma)             │
│ SELECT * FROM Expense               │
│ WHERE status = 'PENDING'            │
│ JOIN User, Approval tables...       │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Database returns results            │
│ - Expense records with relations    │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Service formats response            │
│ - Maps database records to objects  │
│ - Returns 200 OK response           │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Frontend receives response          │
│ - approvalsService resolves         │
│ - setExpenses() updates state       │
│ - Loading state set to false        │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ React re-renders page               │
│ - ApprovalsTable displays expenses  │
│ - Statistics updated                │
│ - Filters available                 │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Manager clicks "Approve" button     │
│ - selectedExpense stored            │
│ - Modal opens                       │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Manager adds comments               │
│ - Optional field (max 500 chars)    │
│ - Clicks "✓ Approve"                │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Frontend calls approveExpense()     │
│ - approvalsService.approveExpense() │
│ - POST /api/approvals/approve/:id   │
│ - Sends comments in body            │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Backend receives approval request   │
│ - authMiddleware verifies           │
│ - roleMiddleware checks MANAGER     │
│ - Validation middleware runs        │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Controller action executes          │
│ - Checks authorization              │
│ - Validates input                   │
│ - Calls service.approveExpense()    │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Service logic executes              │
│ - Updates Expense.status to APPROVED│
│ - Creates Approval record           │
│ - Triggers notification             │
│ - Logs audit trail                  │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Database transaction commits        │
│ - Changes persisted                 │
│ - Returns success response          │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Notification queued                 │
│ - Email/In-app notification sent    │
│ - Employee notified of approval     │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ Frontend receives success response  │
│ - Modal closes                      │
│ - fetchExpenses() called again      │
│ - Expense list updated              │
│ - Status shows "APPROVED"           │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ UI Updates Complete                 │
│ - Table refreshed                   │
│ - Statistics updated                │
│ - Success message shown             │
└─────────────────────────────────────┘
```

## Component Hierarchy

```
App
└── Router
    └── Approvals Page
        ├── Header & Search/Filters
        ├── ApprovalsStats
        │   ├── StatCard (Pending)
        │   └── StatCard (Total Amount)
        ├── ApprovalsTable
        │   ├── TableHead
        │   └── TableBody
        │       └── TableRow[] (Each Expense)
        │           └── Action Buttons
        └── ApprovalModal
            ├── ModalHeader
            ├── ModalBody
            │   ├── ExpenseSummary
            │   ├── CommentsInput
            │   └── Alert
            └── ModalFooter
                ├── CancelButton
                └── ConfirmButton
```

## State Management Flow

```
Approvals Page Component
├── useState: expenses []
├── useState: filters {}
├── useState: selectedExpense
├── useState: isModalOpen boolean
├── useState: actionType 'APPROVE'|'REJECT'
└── useState: error/loading

Custom Hook: useApprovals
├── Manages: expenses, loading, error, filters, stats
├── Methods: 
│   ├── fetchExpenses()
│   ├── approveExpense()
│   ├── rejectExpense()
│   ├── updateFilters()
│   └── resetFilters()
└── Calls: approvalsService methods

Services: approvalsService
├── HTTP clients for API endpoints
├── Request builders with JWT tokens
├── Response handlers and error management
└── Data transformation for frontend use
```

---

**Last Updated**: March 29, 2026
**Version**: 1.0
