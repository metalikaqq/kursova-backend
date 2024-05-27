const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/api/login', userController.login);
router.post('/api/register', userController.registerUser);

module.exports = { router };
