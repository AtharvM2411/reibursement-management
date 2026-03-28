const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = {
  connect: async () => {
    try {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/reimbursement-management';
      
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  },

  disconnect: async () => {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (error) {
      console.error('MongoDB disconnection error:', error);
    }
  },
};

module.exports = db;
