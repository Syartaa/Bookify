const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/loan');

// Define routes
router.get('/', LoanController.getAllLoans);
router.get('/:id', LoanController.getLoanById);
router.post('/', LoanController.createLoan);
router.put('/:id', LoanController.updateLoan);
router.delete('/:id', LoanController.deleteLoan);
router.get('/check-borrowed/:bookId/:userId', LoanController.checkIfBookIsBorrowed);

router.get("/user/:userId", LoanController.getUserLoans);


module.exports = router;
