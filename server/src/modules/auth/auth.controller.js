const authService = require('./auth.service');

const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  signup: async (req, res, next) => {
    try {
      const userData = req.body;
      const result = await authService.signup(userData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  logout: (req, res) => {
    // Logout logic can be handled on client-side
    res.status(200).json({ message: 'Logged out successfully' });
  },
};

module.exports = authController;
