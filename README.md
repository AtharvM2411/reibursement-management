# Reimbursement Management System

A comprehensive web application for managing employee expense reimbursements with approval workflows, rule evaluation, and OCR receipt processing.

## Features

- **User Management**: Multi-role system (Admin, Manager, Employee)
- **Expense Tracking**: Create, submit, and track expense reimbursements
- **Approval Workflow**: Dynamic approval routing based on configurable rules
- **OCR Receipt Processing**: Automatic extraction of receipt data
- **Rule Engine**: Configure approval rules based on amount, category, and other criteria
- **Currency Support**: Multi-currency expense tracking and conversion
- **Dashboard**: Role-based dashboards for different user types

## Project Structure

### Frontend (Client)
```
client/
├── public/
├── src/
│   ├── assets/           # Images, icons
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components organized by feature
│   ├── services/        # API call services
│   ├── store/           # State management
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   ├── constants/       # Application constants
│   ├── layouts/         # Layout wrappers
│   ├── routes/          # Route guards
│   └── App.jsx
└── package.json
```

### Backend (Server)
```
server/
├── src/
│   ├── config/          # Database and environment config
│   ├── modules/         # Feature-based modules
│   │   ├── auth/       # Authentication
│   │   ├── users/      # User management
│   │   ├── expenses/   # Expense management
│   │   ├── approvals/  # Approval workflow
│   │   ├── rules/      # Rule management
│   │   ├── company/    # Company information
│   │   └── receipts/   # OCR receipt processing
│   ├── workflows/       # Business logic engines
│   ├── middleware/      # Express middleware
│   ├── utils/          # Helper utilities
│   ├── database/       # Database migrations and seeds
│   ├── app.js
│   └── server.js
└── package.json
```

## Technology Stack

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **State Management**: Redux/Zustand (configurable)

### Backend
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **BCryptjs**: Password hashing

### Additional Services
- **Docker**: Containerization
- **Tesseract.js**: OCR processing (optional)

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (or Docker)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reimbursement-management
   ```

2. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Install Dependencies**
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker-compose up -d mongodb
   
   # Or use local MongoDB instance
   ```

5. **Run the Application**
   ```bash
   # Backend (from server directory)
   npm run dev
   
   # Frontend (from client directory in another terminal)
   npm start
   ```

### Using Docker Compose

```bash
docker-compose up --build
```

This will start:
- MongoDB on port 27017
- Backend server on port 3001
- Frontend client on port 3000

## API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/:id` - Get expense details
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Approvals
- `GET /api/approvals/pending` - Get pending approvals
- `POST /api/approvals/:id/approve` - Approve expense
- `POST /api/approvals/:id/reject` - Reject expense

### Rules
- `GET /api/rules` - Get all rules
- `POST /api/rules` - Create new rule
- `PUT /api/rules/:id` - Update rule
- `DELETE /api/rules/:id` - Delete rule

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Configuration

### JWT Secret
Update the `JWT_SECRET` in `.env` file:
```
JWT_SECRET=your-super-secret-key-change-this-in-production
```

### Database Connection
Configure MongoDB connection in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/reimbursement-management
```

### CORS Settings
Update client URL in `.env`:
```
CLIENT_URL=http://localhost:3000
```

## User Roles

1. **Admin**
   - Full system access
   - User management
   - Rule configuration
   - System settings

2. **Manager**
   - Approve expenses from team members
   - View team reports
   - Configure department rules

3. **Employee**
   - Submit expenses
   - View personal expense history
   - Track approval status

## Workflow Flowchart

```
Employee submits expense
├── Rule Evaluation
├── Amount Check (< threshold → Auto-approve OR requires approval)
├── Assign to Manager/Approver
├── Manager Reviews & Approves/Rejects
└── Update Status & Notify Employee
```

## Contributing

1. Create a new branch for each feature
2. Make your changes
3. Write tests if applicable
4. Submit a pull request

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
