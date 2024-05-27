const UserService = require('../services/user.js')

class UserController {

  async registerUser(req, res) {
    try {
      const { name, password } = req.body;
      const user = await UserService.register({ name, password });
      res.status(201).json(user);
    } catch (error) {
      console.error(`Error in registerUser: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const user = await UserService.login(name, password);
      res.json(user);
    } catch (error) {
      console.error(`Error in login: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = new UserController();