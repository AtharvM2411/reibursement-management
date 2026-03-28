const express = require('express');
const userController = require('./user.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
