# Approvals System - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Create Database Tables (<1 min)

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### Step 2: Register Routes (<1 min)

Edit `server/src/routes/index.js`:

```javascript
const approvalRoutes = require('../modules/approvals/approval.routes');
router.use('/approvals', approvalRoutes);
```

### Step 3: Add Frontend Route (1 min)

In your routing configuration:

```javascript
import Approvals from './pages/approvals/Approvals';

// Add to routes array:
{
  path: '/approvals',
  element: <Approvals />,
  requiresAuth: true,
  requiredRoles: ['MANAGER', 'ADMIN']
}
```

### Step 4: Update Navigation (1 min)

Add link to your navigation component:

```javascript
{['MANAGER', 'ADMIN'].includes(user?.role) && (
  <a href="/approvals">Approvals</a>
)}
```

### Step 5: Test It! (1 min)

1. Create a test expense with PENDING status
2. Log in as MANAGER or ADMIN
3. Go to `/approvals`
4. Try approving or rejecting an expense

## 📋 Checklist

- [ ] Database migration completed
- [ ] Routes registered in backend
- [ ] Routes added to frontend
- [ ] Navigation link added
- [ ] User has MANAGER or ADMIN role
- [ ] Test expense created
- [ ] Successfully accessed /approvals page
- [ ] Successfully approved/rejected expense

## 🎯 Key Endpoints

```
GET  /api/approvals/pending              # Get expenses to approve
POST /api/approvals/approve/:id          # Approve expense
POST /api/approvals/reject/:id           # Reject expense
GET  /api/approvals/stats                # Get statistics
GET  /api/approvals/history/:id          # Get approval history
```

## 🔑 Default Test Credentials

Create test users with these roles:

```sql
INSERT INTO User (id, name, email, password, role) VALUES
('user-1', 'John Employee', 'john@company.com', 'hashedpass', 'EMPLOYEE'),
('user-2', 'Jane Manager', 'jane@company.com', 'hashedpass', 'MANAGER'),
('user-3', 'Admin User', 'admin@company.com', 'hashedpass', 'ADMIN');
```

## 📱 Access the System

```
Manager/Admin can access:
- http://localhost:3000/approvals

View pending expenses:
- Filter by status, date, search
- See expense details

Approve/Reject:
- Click buttons to open modal
- Add comments (optional for approve, required for reject)
- Confirm action

Track History:
- View all approval actions
- See who approved/rejected
- View comments and reasons
```

## 💡 Test Scenarios

### Scenario 1: Happy Path Approval
1. Employee submits expense (PENDING)
2. Manager logs in
3. Opens /approvals
4. Clicks "Approve" on expense
5. Adds comment: "Looks good"
6. Confirms approval
7. Verify: Expense status = APPROVED

### Scenario 2: With Rejection
1. Employee submits expense (PENDING)
2. Manager logs in
3. Opens /approvals
4. Clicks "Reject" on expense
5. Enters reason: "Missing receipt"
6. Confirms rejection
7. Verify: Expense status = REJECTED

### Scenario 3: Filtering
1. Create multiple expenses with different statuses
2. Filter by status: PENDING → Only pending shown
3. Filter by date: This Week → Only recent shown
4. Search: Type employee name → Filtered results
5. Verify: Filters work correctly

## 🚨 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Access Denied" | User role must be MANAGER or ADMIN |
| No expenses shown | Check expense status is PENDING |
| API 500 errors | Run migrations again: `npx prisma migrate reset` |
| Can't approve | User might be approving own expense |
| Filters not working | Check filter parameters are valid |

## 📊 Testing API Manually

### Using cURL

```bash
# Get pending expenses
curl -X GET http://localhost:3000/api/approvals/pending \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"

# Approve an expense
curl -X POST http://localhost:3000/api/approvals/approve/EXPENSE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"approvedBy": "USER_ID", "comments": "Approved"}'

# Get statistics
curl -X GET http://localhost:3000/api/approvals/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Set up collection: `Reimbursement Management`
2. Create requests:
   - Get Pending: GET `/api/approvals/pending`
   - Approve: POST `/api/approvals/approve/{id}`
   - Reject: POST `/api/approvals/reject/{id}`
   - Stats: GET `/api/approvals/stats`
3. Add Authorization header with JWT token
4. Test each endpoint

## 📚 Next Steps

1. ✅ Get system running (this guide)
2. 📖 Read [APPROVALS_SYSTEM_DESIGN.md](./APPROVALS_SYSTEM_DESIGN.md) for architecture
3. 🔧 Read [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for advanced setup
4. 🎓 Review [APPROVALS_README.md](./APPROVALS_README.md) for features
5. 🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design

## ❓ FAQ

**Q: Can employees use approvals page?**
A: No, only MANAGER and ADMIN roles can access it.

**Q: Can a manager approve their own expense?**
A: No, the system prevents self-approval for security.

**Q: Are approvals reversible?**
A: Current implementation doesn't support reversal (feature for future).

**Q: Where are comments stored?**
A: In the `Approval` table in the `comments` or `rejectionReason` columns.

**Q: How long does processing take?**
A: Real-time - instant update to database and UI refresh.

**Q: Can multiple people approve one expense?**
A: Current implementation supports sequential approvals via audit trail.

---

**Quick Links:**
- [System Design](./APPROVALS_SYSTEM_DESIGN.md)
- [Integration Guide](./INTEGRATION_GUIDE.md)
- [Full README](./APPROVALS_README.md)
- [Architecture](./ARCHITECTURE.md)

Ready to go! 🚀
