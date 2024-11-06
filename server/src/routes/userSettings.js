// routes/accountSettings.js
const express = require('express');
const { updateProfile, changePassword, deleteAccount } = require('../controllers/userSettings');
const router = express.Router();

// Route for updating profile information
router.put('/profile', updateProfile);

// Route for changing password
router.put('/change-password', changePassword);

// Route for deleting account
router.delete('/delete', deleteAccount);

module.exports = router;
