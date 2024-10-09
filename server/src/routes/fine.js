const express = require('express');
const router = express.Router();
const FineController = require('../controllers/fine');

// Define routes
router.get('/', FineController.getAllFines);
router.get('/:id', FineController.getFineById);
router.post('/', FineController.createFine);
router.put('/:id', FineController.updateFine);
router.delete('/:id', FineController.deleteFine);

module.exports = router;
