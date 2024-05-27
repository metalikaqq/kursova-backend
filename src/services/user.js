const User = require('../models/user-model')

class UserService {


  async hello() {
    return 'Hello, World!';
  }

  async register(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {

      if (error.code === 11000) {
        throw new Error('User with this name already exists');
      }
      throw error;
    }
  }

  async login(name, password) {
    try {
      const user = await User.findOne({ name, password });

      if (!user) {
        throw new Error('Invalid name or password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new UserService();