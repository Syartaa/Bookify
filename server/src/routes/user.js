const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');  // Adjust path based on your folder structure

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a single user by ID (for editing)
router.get('/:id', userController.getUserById);

// Route to update a user
router.put('/:id', userController.updateUser);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
