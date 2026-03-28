const User = require('./user.model');

const userService = {
  getAllUsers: async () => {
    return await User.find().select('-password');
  },

  getUserById: async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }
    return user;
  },

  updateUser: async (id, updateData) => {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select('-password');
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }
    return user;
  },

  deleteUser: async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }
  },
};

module.exports = userService;
