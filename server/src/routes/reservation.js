const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');

// Define routes
router.get('/', ReservationController.getAllReservations);
router.get('/:id', ReservationController.getReservationById);
router.post('/', ReservationController.createReservation);
router.put('/:id', ReservationController.updateReservation);
router.delete('/:id', ReservationController.deleteReservation);
router.get('/user/:userId/book/:bookId', ReservationController.checkReservationStatus);
router.delete('/user/:userId/book/:bookId', ReservationController.deleteReservationByUserAndBook);



module.exports = router;
