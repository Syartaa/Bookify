const Author = require('../models/author');
const Book = require('../models/book');
const Category = require('../models/category');
const Reservation = require('../models/reservation');
const User = require('../models/user');

// Get all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [
                { 
                    model: Book,
                    include: [
                        { model: Author, attributes: ["name"] },
                        { model: Category, attributes: ["name"] }
                    ]
                },
                { model: User, attributes: ['id', 'name'] }
            ],
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a reservation by ID
const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Check if a specific user has reserved a specific book
const checkReservationStatus = async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        const reservation = await Reservation.findOne({
            where: { userId, bookId },
        });

        if (reservation) {
            return res.json({ isReserved: true, reservation });
        }

        res.json({ isReserved: false });
    } catch (error) {
        console.error('Error checking reservation status:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new reservation
const createReservation = async (req, res) => {
    const { reservationDate, status, bookId, userId } = req.body;

    try {
        const reservation = await Reservation.create({
            reservationDate,
            status,
            bookId,
            userId,
        });

        res.status(201).json(reservation);
    } catch (error) {
        console.error('Error creating reservation:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a reservation
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { reservationDate, status, bookId, userId } = req.body;

    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.update({
            reservationDate: reservationDate || reservation.reservationDate,
            status: status || reservation.status,
            bookId: bookId || reservation.bookId,
            userId: userId || reservation.userId,
        });

        res.json(reservation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReservation = await Reservation.findByPk(id);
        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await Reservation.destroy({ where: { id } });
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a reservation by userId and bookId (Unreserve)
const deleteReservationByUserAndBook = async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        const reservation = await Reservation.findOne({ where: { userId, bookId } });
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.destroy();
        res.json({ message: 'Reservation unreserved successfully' });
    } catch (error) {
        console.error('Error unreserving reservation:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    checkReservationStatus,
    createReservation,
    updateReservation,
    deleteReservation,
    deleteReservationByUserAndBook,
};
