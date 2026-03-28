const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const env = require('../../config/env');

const authService = {
  login: async (email, password) => {
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw { status: 401, message: 'Invalid credentials' };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw { status: 401, message: 'Invalid credentials' };
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRE }
      );

      return { token, user };
    } catch (error) {
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        throw { status: 400, message: 'User already exists' };
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRE }
      );

      return { token, user };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authService;
