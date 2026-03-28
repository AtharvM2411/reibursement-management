# Reimbursement Management System

A complete web application for managing employee expense reimbursements, approvals, and payments in a structured way.

---

## 📋 Table of Contents

1. [What is This Project?](#what-is-this-project)
2. [How It Works - Simple Overview](#how-it-works---simple-overview)
3. [Key Features](#key-features)
4. [Project Architecture](#project-architecture)
5. [Folder Structure Explained](#folder-structure-explained)
6. [Frontend (User Interface)](#frontend-user-interface)
7. [Backend (Server & Logic)](#backend-server--logic)
8. [Database Structure](#database-structure)
9. [User Roles & Permissions](#user-roles--permissions)
10. [Complete Data Flow](#complete-data-flow)
11. [Installation & Setup](#installation--setup)
12. [Running the Application](#running-the-application)
13. [How Each Part Works](#how-each-part-works)
14. [Common Tasks](#common-tasks)
15. [Troubleshooting](#troubleshooting)

---

## What is This Project?

This is an **Expense Reimbursement Management System**. Think of it as a digital process for:

1. **Employees** submit expenses (like travel, meals, supplies they bought for work)
2. **Managers** review and approve these expenses
3. **Admins** manage rules and users
4. **System** automatically processes payments based on rules

### Real-World Example:
- Employee John travels to a meeting and spends $500 on flights
- John submits this expense in the system with a receipt
- John's manager receives a notification to approve it
- Manager reviews and clicks "Approve"
- System records this and marks it ready for reimbursement
- Finance team can now process the payment to John

---

## How It Works - Simple Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    REIMBURSEMENT FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Employee              System              Manager          │
│     │                    │                    │             │
│     ├─ Submits Expense ─→ │                    │             │
│     │                    │                    │             │
│     │                    ├─ Checks Rules ─────┤             │
│     │                    │                    │             │
│     │                    │ ← Manager Reviews ─┤             │
│     │                    │                    │             │
│     │ ← Approved/Update  │ ← Manager Approves │             │
│     │                    │                    │             │
│     └─ Reimbursement ────┤                    │             │
│        Processed         │                    │             │
│                          │                    │             │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Features

### ✅ Expense Management
- Employees can create, edit, and delete expense records
- Track multiple expenses in one dashboard
- Upload receipts and attach descriptions
- Check approval status anytime

### ✅ Approval Workflow
- Automatic routing to correct manager
- Managers can approve or reject expenses with comments
- Track approval history
- Automatic notifications

### ✅ Smart Rules Engine
- Create custom approval rules
- For example: "Expenses > $1000 need 2 approvals"
- Rules can be based on amount, category, department
- Admin can enable/disable rules anytime

### ✅ Multi-Role System
- **Employees**: Submit and track expenses
- **Managers**: Approve team expenses
- **Admins**: Manage users, rules, company settings

### ✅ OCR Receipt Processing
- Upload receipt images
- System can read text from receipts automatically
- Extract: vendor name, date, amount

### ✅ Currency Support
- Track expenses in different currencies
- Automatic currency conversion
- Central currency for reporting

---

## Project Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   WEB BROWSER                            │
│  (User sees buttons, forms, dashboards here)             │
└──────────────────┬───────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │  FRONTEND (React)   │
        │  - User Interface   │
        │  - Forms & Pages    │
        │  - Displays Data    │
        └──────────┬──────────┘
                   │
         ┌─────────┴─────────┐
         │  INTERNET HTTP    │
         │  (Data Exchange)  │
         └─────────┬─────────┘
                   │
        ┌──────────┴──────────────────┐
        │  BACKEND (Node.js/Express) │
        │  - Server Logic             │
        │  - Processes Requests       │
        │  - Applies Rules            │
        │  - Manages Approvals        │
        └──────────┬──────────────────┘
                   │
        ┌──────────┴──────────────┐
        │   DATABASE (MongoDB)   │
        │   - Stores All Data    │
        │   - User Records       │
        │   - Expenses           │
        │   - Approvals          │
        └───────────────────────┘
```

---

## Folder Structure Explained

### 📁 Root Level (`reimbursement-management/`)

```
reimbursement-management/
│
├── 📂 client/                    ← FRONTEND - Everything user sees
├── 📂 server/                    ← BACKEND - Logic & Processing
├── 📂 docs/                      ← Documentation files
├── 📂 scripts/                   ← Script files (if any)
├── .env                          ← Configuration secrets
├── docker-compose.yml            ← Docker setup (containers)
├── README.md                     ← This file
├── DEVELOPMENT.md                ← Dev guide
└── .gitignore                    ← Files to ignore in git
```

---

## FRONTEND - User Interface (React)

### What is Frontend?
The **frontend** is everything the user sees and clicks on. It's like the face of the application.

### Location: `client/` Folder

```
client/
│
├── public/                       ← Static files
│   └── index.html               ← Main HTML page
│
├── src/                          ← Source code
│   │
│   ├── App.jsx                  ← Main component (entry point)
│   ├── index.js                 ← Starts the app
│   ├── index.css                ← Global styles
│   │
│   ├── 📂 pages/                ← Complete Pages
│   │   ├── auth/
│   │   │   ├── Login.jsx        ← Login page
│   │   │   └── Signup.jsx       ← Registration page
│   │   │
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard.jsx      ← Admin homepage
│   │   │   ├── ManagerDashboard.jsx    ← Manager homepage
│   │   │   └── EmployeeDashboard.jsx   ← Employee homepage
│   │   │
│   │   ├── expenses/
│   │   │   ├── CreateExpense.jsx       ← Form to create expense
│   │   │   ├── ExpenseList.jsx         ← Show all expenses
│   │   │   └── ExpenseDetails.jsx      ← Show one expense
│   │   │
│   │   ├── approvals/
│   │   │   ├── PendingApprovals.jsx    ← Manager's pending tasks
│   │   │   └── ApprovalDetails.jsx     ← Details of one approval
│   │   │
│   │   └── settings/
│   │       ├── Users.jsx               ← Manage users
│   │       └── Rules.jsx               ← Configure approval rules
│   │
│   ├── 📂 components/           ← Reusable components (like LEGO blocks)
│   │   ├── common/              ← Used everywhere
│   │   │   ├── Header.jsx       ← Top banner with logo
│   │   │   ├── Sidebar.jsx      ← Left menu
│   │   │   └── LoadingSpinner.jsx ← "Loading..." animation
│   │   │
│   │   ├── forms/               ← Input forms
│   │   │   └── ExpenseForm.jsx  ← Form to submit expenses
│   │   │
│   │   ├── tables/              ← Display data in tables
│   │   │   └── ExpenseTable.jsx ← Table showing expenses
│   │   │
│   │   └── modals/              ← Pop-up windows
│   │       └── ApprovalModal.jsx ← Pop-up for approvals
│   │
│   ├── 📂 services/             ← Code that talks to backend
│   │   ├── api.js               ← Basic API setup
│   │   ├── authService.js       ← Login/Logout functions
│   │   ├── expenseService.js    ← Functions for expenses
│   │   └── approvalService.js   ← Functions for approvals
│   │
│   ├── 📂 store/                ← Data storage (like app memory)
│   │   ├── authStore.js         ← Stores user login info
│   │   ├── expenseStore.js      ← Stores expense data
│   │   └── approvalStore.js     ← Stores approval data
│   │
│   ├── 📂 hooks/                ← Custom React hooks
│   │   └── useAuth.js           ← Hook to check if user logged in
│   │
│   ├── 📂 utils/                ← Helper functions
│   │   ├── helpers.js           ← Utility functions (format date, etc)
│   │   └── constants.js         ← Fixed values (roles, categories)
│   │
│   ├── 📂 layouts/              ← Page layouts
│   │   └── MainLayout.jsx       ← Main layout with header & sidebar
│   │
│   ├── 📂 routes/               ← Route management
│   │   └── ProtectedRoute.jsx   ← Blocks access to non-logged users
│   │
│   └── 📂 assets/               ← Images, icons, etc
│
├── .env.example                 ← Example environment file
├── .gitignore                   ← Ignore node_modules, etc
├── package.json                 ← Project dependencies & scripts
└── Dockerfile                   ← Instructions to run in container
```

### How Frontend Works:

1. **User Opens Browser** → `index.html` loads
2. **React Starts** → `index.js` runs
3. **App.jsx Runs** → Sets up pages and routing
4. **User Sees Pages** → Pages and components render
5. **User Clicks Button** → Component handles the click
6. **Data Needed?** → Service files call backend API
7. **Data Returns** → Store updated with new data
8. **Page Re-renders** → Shows updated information

---

## BACKEND - Server & Logic (Node.js/Express)

### What is Backend?
The **backend** is the brain of the application. It processes data, applies rules, handles approvals, and stores everything safely.

### Location: `server/` Folder

```
server/
│
├── src/
│   │
│   ├── 📂 config/               ← Configuration
│   │   ├── db.js                ← Database connection setup
│   │   └── env.js               ← Environment variables
│   │
│   ├── 📂 modules/              ← Feature modules (organized by feature)
│   │   ├── auth/                ← Login & Registration
│   │   │   ├── auth.controller.js  ← Handles login requests
│   │   │   ├── auth.service.js     ← Logic for login (encryption, etc)
│   │   │   ├── auth.routes.js      ← URL endpoints for auth
│   │   │   └── auth.middleware.js  ← Checks user token
│   │   │
│   │   ├── users/               ← User Management
│   │   │   ├── user.model.js       ← How user data looks
│   │   │   ├── user.controller.js  ← Handles user requests
│   │   │   ├── user.service.js     ← User logic
│   │   │   └── user.routes.js      ← URLs for users
│   │   │
│   │   ├── expenses/            ← Expense Management
│   │   │   ├── expense.model.js    ← How expense data looks
│   │   │   ├── expense.controller.js ← Handles expense requests
│   │   │   ├── expense.service.js  ← Expense logic
│   │   │   └── expense.routes.js   ← URLs for expenses
│   │   │
│   │   ├── approvals/           ← Approval Management
│   │   │   ├── approval.model.js   ← How approval data looks
│   │   │   ├── approval.controller.js ← Handles approval requests
│   │   │   ├── approval.service.js ← Approval logic
│   │   │   └── approval.routes.js  ← URLs for approvals
│   │   │
│   │   ├── rules/               ← Rules Management
│   │   │   ├── rule.model.js       ← How rule data looks
│   │   │   ├── rule.controller.js  ← Handles rule requests
│   │   │   ├── rule.service.js     ← Rule logic
│   │   │   └── rule.routes.js      ← URLs for rules
│   │   │
│   │   ├── company/             ← Company Info
│   │   │   ├── company.model.js    ← Company data structure
│   │   │   └── company.service.js  ← Company logic
│   │   │
│   │   └── receipts/            ← Receipt Processing (OCR)
│   │       ├── receipt.controller.js ← Handles receipt upload
│   │       ├── receipt.service.js   ← Process receipt data
│   │       └── ocr.service.js       ← Read text from images
│   │
│   ├── 📂 workflows/            ← Business Logic Engine
│   │   ├── approvalEngine.js    ← Decides if expense needs approval
│   │   └── ruleEvaluator.js     ← Checks if rules are satisfied
│   │
│   ├── 📂 middleware/           ← Middleware (checks before processing)
│   │   ├── authMiddleware.js    ← Checks if user is logged in
│   │   ├── roleMiddleware.js    ← Checks user role/permissions
│   │   └── errorHandler.js      ← Catches and handles errors
│   │
│   ├── 📂 utils/                ← Helper functions
│   │   ├── logger.js            ← Logs app activity
│   │   ├── constants.js         ← Fixed values (roles, status)
│   │   └── currencyConverter.js ← Converts currencies
│   │
│   ├── 📂 database/             ← Database related
│   │   ├── migrations/          ← Database update scripts
│   │   ├── seeders/             ← Sample data creation
│   │   └── schema.sql           ← Database structure (reference)
│   │
│   ├── app.js                   ← Main app setup
│   │   (Sets up all routes, middleware, etc)
│   │
│   └── server.js                ← Starts the server
│       (Listens on port 3001)
│
├── package.json                 ← Project dependencies
├── .env.example                 ← Example configuration
├── .gitignore                   ← Files to ignore
└── Dockerfile                   ← Container instructions
```

### How Backend Works:

1. **Server Starts** → `server.js` runs
2. **App Setup** → `app.js` configures all routes
3. **User Request Arrives** → From frontend (e.g., "approve expense")
4. **Route Matched** → `approval.routes.js` matches the URL
5. **Controller Called** → `approval.controller.js` receives request
6. **Service Logic** → `approval.service.js` does the work
7. **Database Update** → Data saved in MongoDB
8. **Response Sent** → Sends result back to frontend
9. **Frontend Updates** → User sees the change

---

## Database Structure

### What is Database?
The **database** is like a filing system that stores all the data permanently.

### Collections (Tables) in MongoDB:

#### 1. **Users** - Stores employee information
```
{
  _id: "123",
  name: "John Doe",
  email: "john@company.com",
  password: "encrypted-password",
  role: "employee",              ← Can be: employee, manager, admin
  department: "Sales",
  manager: "456",                ← ID of their manager
  active: true,
  created_at: "2024-01-01"
}
```

#### 2. **Expenses** - Stores submitted expenses
```
{
  _id: "001",
  employee: "123",               ← ID of employee who submitted
  amount: 500,
  category: "Travel",            ← Travel, Meals, Office Supplies, etc
  description: "Flight to NYC",
  receiptUrl: "image-url",
  status: "submitted",           ← draft, submitted, approved, rejected, reimbursed
  approvedBy: "456",             ← ID of manager who approved
  rejectionReason: null,
  submitDate: "2024-01-05",
  approvalDate: "2024-01-06",
  created_at: "2024-01-05"
}
```

#### 3. **Approvals** - Stores approval records
```
{
  _id: "APP001",
  expense: "001",                ← ID of expense to approve
  approver: "456",               ← ID of manager assigned to approve
  status: "pending",             ← pending, approved, rejected
  comment: "Looks good, approved",
  rejectionReason: null,
  approvalDate: "2024-01-06",
  created_at: "2024-01-05"
}
```

#### 4. **Rules** - Stores approval rules
```
{
  _id: "RULE001",
  name: "High Amount Check",
  description: "All expenses > $500 need manager approval",
  condition: {
    field: "amount",
    operator: ">",
    value: 500
  },
  action: {
    requiresApproval: true,
    approvalLevel: 1
  },
  active: true,
  priority: 1,
  created_at: "2024-01-01"
}
```

#### 5. **Company** - Stores company information
```
{
  _id: "COMP001",
  name: "Tech Company Inc",
  email: "admin@techcompany.com",
  phone: "+1-234-567-8900",
  address: "123 Main St",
  city: "New York",
  country: "USA",
  created_at: "2024-01-01"
}
```

---

## User Roles & Permissions

### 🔐 Three Types of Users:

#### 1. **EMPLOYEE**
What they can do:
- ✅ Create new expenses
- ✅ Edit their draft expenses
- ✅ Delete draft expenses
- ✅ View their own expenses
- ✅ Check approval status
- ✅ Upload receipts
- ❌ Cannot approve expenses
- ❌ Cannot change rules
- ❌ Cannot manage users

Dashboard: "Employee Dashboard" - shows their expenses and status

#### 2. **MANAGER**
What they can do:
- ✅ View team member expenses
- ✅ Approve or reject expenses
- ✅ Add comments on approvals
- ✅ Create expenses (like any employee)
- ✅ View reports
- ❌ Cannot manage users
- ❌ Cannot change global rules

Dashboard: "Manager Dashboard" - shows pending approvals and team expenses

#### 3. **ADMIN**
What they can do:
- ✅ Do everything any user can do
- ✅ Create/edit/delete users
- ✅ Create/modify approval rules
- ✅ Update company information
- ✅ View all system reports
- ✅ Change any expense status
- ✅ Delete users

Dashboard: "Admin Dashboard" - shows system overview, user management, rules

---

## Complete Data Flow

### Scenario: Employee Submits an Expense

```
STEP 1: EMPLOYEE ACTION
┌─────────────────────────────────────────┐
│  Employee opens CreateExpense.jsx page  │
│  Fills form: Amount, Category, etc      │
│  Clicks "Submit Expense"                │
└─────────────────────┬───────────────────┘
                      │
STEP 2: FRONTEND PROCESSES
┌─────────────────────────────────────────┐
│  ExpenseForm.jsx validates form         │
│  Calls: expenseService.createExpense()  │
│  Data sent to backend via HTTP POST     │
└─────────────────────┬───────────────────┘
                      │
STEP 3: BACKEND RECEIVES
┌─────────────────────────────────────────┐
│  expense.routes.js catches POST request │
│  Calls: expenseController.createExpense │
│  authMiddleware checks user is logged in│
└─────────────────────┬───────────────────┘
                      │
STEP 4: BACKEND PROCESSES
┌─────────────────────────────────────────┐
│  expenseService.createExpense() runs    │
│  Creates new expense object             │
│  Sets status = "submitted"              │
│  Calls ruleEvaluator.evaluateRules()    │
│  Checks: Is this amount > $500? etc     │
│  Decides if approval needed             │
└─────────────────────┬───────────────────┘
                      │
STEP 5: SAVE TO DATABASE
┌─────────────────────────────────────────┐
│  New expense saved to MongoDB           │
│  If approval needed, Approval record    │
│  created and assigned to manager        │
│  Manager gets notified (emails, etc)    │
└─────────────────────┬───────────────────┘
                      │
STEP 6: RESPONSE TO FRONTEND
┌─────────────────────────────────────────┐
│  Backend sends back: success + data     │
│  expenseStore.js updated with new data  │
│  ExpenseList.jsx refreshes to show new  │
│  expense                                │
└─────────────────────┬───────────────────┘
                      │
STEP 7: USER SEES RESULT
┌─────────────────────────────────────────┐
│  Employee sees "Expense Created!"       │
│  New expense appears in their list      │
│  Status shows "Submitted"               │
│  They can track it anytime              │
└─────────────────────────────────────────┘
```

### Scenario: Manager Approves Expense

```
STEP 1: MANAGER NOTIFICATION
┌──────────────────────────────────────────┐
│  Manager logs in, sees notification      │
│  "You have 3 expenses to approve"        │
│  Clicks on PendingApprovals.jsx page     │
└──────────────────┬───────────────────────┘
                   │
STEP 2: VIEW APPROVAL DETAILS
┌──────────────────────────────────────────┐
│  Clicks on an expense                    │
│  ApprovalModal.jsx pops up               │
│  Shows: Employee name, amount, reason    │
│  Shows: Receipt if available             │
└──────────────────┬───────────────────────┘
                   │
STEP 3: MANAGER DECIDES
┌──────────────────────────────────────────┐
│  Manager reads details                   │
│  Clicks "Approve" button                 │
│  Types comment: "Looks good, approved"   │
│  Clicks "Submit"                         │
└──────────────────┬───────────────────────┘
                   │
STEP 4: SEND TO BACKEND
┌──────────────────────────────────────────┐
│  Frontend calls: approvalService.approve │
│  Data: approval ID, comment              │
│  Sent via HTTP POST to backend           │
└──────────────────┬───────────────────────┘
                   │
STEP 5: BACKEND PROCESSES
┌──────────────────────────────────────────┐
│  approval.routes.js receives request     │
│  Calls: approvalController.approveExpense│
│  approvalService.approveExpense() runs   │
│  Updates approval status = "approved"    │
│  Updates expense status = "approved"     │
│  Records approvalDate = now              │
└──────────────────┬───────────────────────┘
                   │
STEP 6: SAVE CHANGES
┌──────────────────────────────────────────┐
│  MongoDB updated:                        │
│  - Approval record updated               │
│  - Expense record updated                │
│  - Both have timestamps                  │
└──────────────────┬───────────────────────┘
                   │
STEP 7: NOTIFY EMPLOYEE
┌──────────────────────────────────────────┐
│  System can send email to employee       │
│  "Your expense was approved!"            │
│  Amount ready for reimbursement          │
└──────────────────┬───────────────────────┘
                   │
STEP 8: UPDATE MANAGER VIEW
┌──────────────────────────────────────────┐
│  Backend returns success response        │
│  Frontend removes item from pending list │
│  Manager sees updated "Pending" count    │
│  Modal closes                            │
└──────────────────────────────────────────┘
```

---

## Installation & Setup

### Requirements:
- **Node.js** v14+ (with npm)
- **MongoDB** (local or cloud)
- **Git** (to clone repository)

### Step 1: Clone the Project

```bash
git clone https://github.com/AtharvM2411/reimbursement-management.git
cd reimbursement-management
```

### Step 2: Setup Backend

```bash
# Go to server folder
cd server

# Install all dependencies listed in package.json
npm install

# Create .env file with configuration
cp .env.example .env

# Edit .env file and add your settings:
# NODE_ENV=development
# PORT=3001
# MONGODB_URI=mongodb://localhost:27017/reimbursement-management
# JWT_SECRET=your-secret-key-here
```

### Step 3: Setup Frontend

```bash
# Go to client folder
cd ../client

# Install all dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file:
# REACT_APP_API_URL=http://localhost:3001/api
```

### Step 4: Verify MongoDB Connection

```bash
# Check if MongoDB is running
# If installed locally, start it:
mongod

# Or check MongoDB status
sudo systemctl status mongod
```

---

## Running the Application

### Option 1: Run Both Frontend & Backend Manually

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
# Server runs on: http://localhost:3001
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
# Frontend opens on: http://localhost:3000
```

### Option 2: Using Docker (If Installed)

```bash
# In root directory
docker-compose up --build

# This starts:
# - MongoDB on port 27017
# - Backend on port 3001
# - Frontend on port 3000
```

### Option 3: Production Build

```bash
# Build frontend for production
cd client
npm run build

# Backend already production-ready
# Just ensure NODE_ENV=production in .env
cd ../server
npm start
```

---

## How Each Part Works

### 🔹 Authentication System (Login)

**What Happens When You Login:**

1. **User enters email & password** in Login.jsx
2. **Frontend validates** (not empty, valid email format)
3. **Sends to backend** via `authService.login()`
4. **Backend receives** in `auth.controller.js`
5. **Checks MongoDB** if user exists
6. **Validates password** (compares encrypted version)
7. **If correct:**
   - Creates JWT token (encrypted user ID)
   - Returns token + user information
8. **Frontend receives** token and stores in localStorage
9. **All future requests** include this token
10. **Middleware checks** token on every request

**Why Tokens?**
- Secure way to remember who logged in
- Expires after 7 days (in this project)
- Prevents someone else using your account

---

### 🔹 Expense Creation

**What Happens When Employee Submits Expense:**

1. **Employee fills form**
   - Amount: 500
   - Category: Travel
   - Description: Flight tickets
   - Receipt: uploads image

2. **Frontend validates**
   - Amount must be number > 0
   - Category must be selected
   - Description not empty

3. **Sends to backend** with user token

4. **Backend receives request**
   - authMiddleware checks token (is user logged in?)
   - Extracts user ID from token
   - Gets expense data from request

5. **Business logic runs**
   - Creates expense object with:
     - employee: user ID
     - status: "submitted"
     - createdAt: today's date
   
6. **Rules checked** (ruleEvaluator.js)
   - Is amount > $500? YES → needs approval
   - Is category travel? → check if company rule applied
   - Results: needs manager approval

7. **Creates approval task**
   - Finds employee's manager
   - Creates Approval record
   - Status: "pending"
   - Assigned to: manager

8. **Saves to database**
   - Expense saved
   - Approval record saved
   - Manager notified

9. **Returns to frontend**
   - Success message
   - expenseStore updated
   - UI refreshes to show new expense

---

### 🔹 Approval Process

**What Happens When Manager Approves:**

1. **Manager views pending approvals**
   - APprovalDetails.jsx loaded
   - Shows list of expenses needing approval

2. **Manager clicks on expense**
   - ApprovalModal.jsx opens
   - Shows full details

3. **Manager clicks "Approve"**
   - Posts to backend: `/api/approvals/123/approve`
   - Includes manager's comment

4. **Backend processes**
   - approvalService.approveExpense() runs
   - Updates Approval: status = "approved"
   - Updates Expense: status = "approved"
   - Sets approvalDate = now
   - Saves both to database

5. **Frontend updates**
   - Modal closes
   - Removes from pending list
   - Shows success message
   - Expense now shows status "approved"

---

### 🔹 Rules Engine

**How Rules Determine Approvals:**

```
Rule Example:
"If amount > $500, require manager approval"

When expense submitted:
1. System evaluates rule
2. Checks: is 500 > 500? YES
3. Action: assign to manager
4. Manager must approve before processing

Another Rule:
"If category = 'Equipment' AND amount > $1000, require 2 approvals"

Evaluation:
1. Is category = 'Equipment'? YES
2. Is amount > $1000? YES  
3. Both conditions met? YES
4. Action: create 2 approval tasks
```

**Where Rules Are Used:**
- Applied when expense is submitted
- Can be customized by admin
- Can enable/disable rules
- Each rule has priority

---

### 🔹 Role-Based Access

**How Permissions Work:**

1. **User logs in** → gets token with role: "employee"
2. **User navigates to admin page** → can't access
3. **Frontend route check** → ProtectedRoute.jsx checks role
4. **If wrong role** → redirects to dashboard
5. **Backend double-checks** → roleMiddleware.js verifies
6. **If unauthorized** → returns error 403

**Example: Creating Rules (Admin Only)**
```
POST /api/rules
→ authMiddleware checks: user logged in?
→ roleMiddleware checks: user is ADMIN?
→ YES → allow → create rule
→ NO → reject → "You don't have permission"
```

---

## Common Tasks

### Task 1: Add a New Expense Category

**File to edit:** `client/src/constants/index.js`

```javascript
// Find EXPENSE_CATEGORIES
export const EXPENSE_CATEGORIES = [
  'Travel',
  'Meals',
  'Office Supplies',
  'Equipment',
  'Other',
  'Medical',  ← Add new category
];
```

### Task 2: Change Token Expiration Time

**File to edit:** `server/.env`

```
JWT_EXPIRE=14d  ← Was 7d, now 14 days
```

### Task 3: Change Approval Rule

App → Settings (admin only) → Rules → Edit/Create/Delete

### Task 4: Add New User

App → Settings (admin only) → Users → Add New User

### Task 5: Increase Amount Limit

Create/Edit rule: Condition → amount → change value

---

## Troubleshooting

### ❌ "Cannot connect to MongoDB"
**Solution:**
1. Check MongoDB is running: `mongod`
2. Check MONGODB_URI in `.env` is correct
3. Try: `mongodb://localhost:27017/reimbursement-management`

### ❌ "npm: command not found"
**Solution:**
1. Install Node.js from nodejs.org
2. Restart terminal/computer
3. Run: `npm --version` to verify

### ❌ "Port 3001 already in use"
**Solution:**
Option A: Change PORT in `.env` to 3002, 3003, etc
Option B: Kill process: `lsof -ti:3001 | xargs kill -9`

### ❌ Frontend can't reach backend
**Solution:**
1. Backend running? Check terminal for "Server running on port 3001"
2. Check REACT_APP_API_URL in client `.env`
3. Should be: `http://localhost:3001/api`

### ❌ "Invalid token" error
**Solution:**
1. Clear browser cache/cookies
2. Logout and login again
3. Token might be expired

### ❌ Page refreshes and logs out automatically
**Solution:**
1. Check JWT_SECRET in `.env` (must be same on all restarts)
2. Check JWT_EXPIRE value
3. Increase JWT_EXPIRE in .env

### ❌ Expense doesn't appear after creating
**Solution:**
1. Check browser console for errors (F12 → Console)
2. Check server terminal for error messages
3. Try refreshing page
4. Check if MongoDB saved the data

### ❌ Manager can't see employee expenses
**Solution:**
1. Employee must be assigned to this manager
2. Check `manager` field in employee user record
3. Edit employee → set correct manager

---

## Summary

### What You Have:
✅ Complete expense management system
✅ Multi-role user system
✅ Approval workflow engine
✅ Rule-based processing
✅ MongoDB database
✅ React frontend
✅ Node.js backend
✅ Docker support
✅ Well-organized code

### How to Extend It:
1. **Add Email Notifications** → Add nodemailer to backend
2. **Add Payment Integration** → Add Stripe/PayPal
3. **Add Dashboards & Reports** → Use charting library
4. **Add Mobile Version** → Use React Native
5. **Add Two-Factor Auth** → Use 2FA package
6. **Add File Storage** → Use AWS S3 or similar

### Need Help?
- Check DEVELOPMENT.md for more details
- Check docs/API_DOCS.md for all API endpoints
- Check server/src/README or similar if exists

---

**🎉 Your project is ready to use!**

Start with:
1. Install dependencies (`npm install` in both folders)
2. Setup `.env` files
3. Start backend: `npm run dev`
4. Start frontend: `npm start`
5. Open http://localhost:3000

