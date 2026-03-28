# Reimbursement Management - Development Guide

## Project Overview

This is a full-stack application for managing employee expense reimbursements with approval workflows.

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend  
cd ../client
npm install
```

### 2. Configure Environment

Create `.env` file in the root directory:

```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/reimbursement-management
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
```

### 3. Start Development Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend (in another terminal)
cd client
npm start
```

### 4. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- MongoDB: localhost:27017

## Development Workflow

### Adding New Features

1. **Backend Changes**
   - Create new routes in `server/src/modules/*/`
   - Update models and services
   - Test with Postman or curl

2. **Frontend Changes**
   - Create components in `client/src/components/`
   - Update pages/routes in `client/src/pages/`
   - Add services in `client/src/services/`
   - Update state management in `client/src/store/`

### Project Structure

- **Modules**: Feature-based architecture (auth, users, expenses, etc.)
- **Controllers**: Handle HTTP requests
- **Services**: Business logic
- **Models**: Data schemas
- **Routes**: API endpoints

## API Documentation

See [API_DOCS.md](./docs/API_DOCS.md) for detailed endpoint documentation.

## Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## Docker Setup

```bash
docker-compose up --build
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### Port Already in Use
- Change PORT in .env or kill process using port

### Module Not Found
- Run `npm install` in the respective directory
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Documentation](https://jwt.io/)

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request
```

## Contributing

Please follow the existing code style and structure.

## Support

Contact the development team for issues or questions.
