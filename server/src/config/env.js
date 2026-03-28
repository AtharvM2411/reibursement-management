require('dotenv').config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/reimbursement-management',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  API_URL: process.env.API_URL || 'http://localhost:3001',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};

module.exports = env;
