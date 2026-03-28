# API Documentation

## Base URL 
```
http://localhost:3001/api
```

## Authentication Endpoints

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

Response:
{
  "token": "jwt-token",
  "user": { id, name, email, role }
}
```

### Signup
```
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
}

Response:
{
  "token": "jwt-token",
  "user": { id, name, email, role }
}
```

### Logout
```
POST /auth/logout

Response: { message: "Logged out successfully" }
```

## Expense Endpoints

### Get All Expenses
```
GET /expenses
Authorization: Bearer <token>

Query Parameters:
- status: draft, submitted, approved, rejected, reimbursed
- category: Travel, Meals, etc.
- limit: number of results
- skip: pagination offset

Response: [{ id, amount, category, status, ... }]
```

### Get Expense by ID
```
GET /expenses/:id
Authorization: Bearer <token>

Response: { id, amount, category, status, ... }
```

### Create Expense
```
POST /expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100.50,
  "category": "Travel",
  "description": "Flight to New York",
  "receiptUrl": "https://..."
}

Response: { id, amount, category, status, ... }
```

### Update Expense
```
PUT /expenses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 150.50,
  "description": "Updated description"
}

Response: { id, amount, category, status, ... }
```

### Delete Expense
```
DELETE /expenses/:id
Authorization: Bearer <token>

Response: 204 No Content
```

## Approval Endpoints

### Get Pending Approvals
```
GET /approvals/pending
Authorization: Bearer <token>

Response: [{ id, expense, status, ... }]
```

### Get Approval by ID
```
GET /approvals/:id
Authorization: Bearer <token>

Response: { id, expense, approver, status, ... }
```

### Approve Expense
```
POST /approvals/:id/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Approved - looks good"
}

Response: { id, status: 'approved', ... }
```

### Reject Expense
```
POST /approvals/:id/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Amount exceeds limit"
}

Response: { id, status: 'rejected', rejectionReason: '...' }
```

## User Endpoints

### Get All Users
```
GET /users
Authorization: Bearer <token>

Response: [{ id, name, email, role, ... }]
```

### Get User by ID
```
GET /users/:id
Authorization: Bearer <token>

Response: { id, name, email, role, ... }
```

### Update User
```
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "department": "Sales"
}

Response: { id, name, email, role, ... }
```

### Delete User
```
DELETE /users/:id
Authorization: Bearer <token>

Response: 204 No Content
```

## Rule Endpoints

### Get All Rules
```
GET /rules
Authorization: Bearer <token>

Response: [{ id, name, condition, action, priority, ... }]
```

### Get Rule by ID
```
GET /rules/:id
Authorization: Bearer <token>

Response: { id, name, condition, action, priority, ... }
```

### Create Rule (Admin Only)
```
POST /rules
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "High Amount Approval",
  "description": "Requires manager approval for amounts > $1000",
  "condition": {
    "field": "amount",
    "operator": ">",
    "value": 1000
  },
  "action": {
    "requiresApproval": true,
    "level": 2
  },
  "priority": 1
}

Response: { id, name, condition, ... }
```

### Update Rule (Admin Only)
```
PUT /rules/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "priority": 2
}

Response: { id, name, condition, ... }
```

### Delete Rule (Admin Only)
```
DELETE /rules/:id
Authorization: Bearer <token>

Response: 204 No Content
```

## Error Responses

### 401 Unauthorized
```json
{
  "status": 401,
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "status": 403,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "status": 404,
  "message": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "status": 400,
  "message": "Invalid input"
}
```

### 500 Internal Server Error
```json
{
  "status": 500,
  "message": "Internal server error"
}
```

## Example Usage with cURL

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

### Get Expenses
```bash
curl -X GET http://localhost:3001/api/expenses \
  -H "Authorization: Bearer <token>"
```

### Create Expense
```bash
curl -X POST http://localhost:3001/api/expenses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"category":"Travel","description":"Flight"}'
```
