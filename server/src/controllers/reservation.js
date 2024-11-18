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


// Get all reservations for a specific user
const getUserReservations = async (req, res) => {
    const { userId } = req.params;

    try {
        const reservations = await Reservation.findAll({
            where: { userId },
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
        console.error("Error fetching user reservations:", error.message);
        res.status(500).json({ error: "Internal server error" });
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

const createReservation = async (req, res) => {
    const { reservationDate, status, bookId, userId } = req.body;

    try {
        // Check if the book is already reserved or borrowed
        const book = await Book.findByPk(bookId);
        if (book.availabilityStatus !== 'available') {
            return res.status(400).json({ error: 'Book is not available for reservation' });
        }

        const existingReservation = await Reservation.findOne({
            where: { bookId, status: 'active' },
        });

        if (existingReservation) {
            return res.status(400).json({ error: 'Book is already reserved by another user' });
        }

        const reservation = await Reservation.create({
            reservationDate,
            status,
            bookId,
            userId,
        });

        // Log the book status before updating
        console.log("Book status before update:", book.availabilityStatus);

        // Update book status to 'reserved'
        await Book.update(
            { availabilityStatus: 'reserved' },
            { where: { id: bookId } }
        );

        // Log the book status after updating
        const bookAfterUpdate = await Book.findByPk(bookId);
        console.log("Book status after update:", bookAfterUpdate.availabilityStatus);

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

        // Delete the reservation
        await reservation.destroy();

        // Update the book's availability status back to 'available'
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Update the book status to 'available'
        await Book.update(
            { availabilityStatus: 'available' },
            { where: { id: bookId } }
        );

        res.json({ message: 'Reservation unreserved successfully' });
    } catch (error) {
        console.error('Error unreserving reservation:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Check if any reservation exists for a given book ID
const checkReservationStatusForBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        // Check if there's an active reservation for this book
        const reservation = await Reservation.findOne({
            where: { bookId, status: 'active' }, // assuming 'active' means reserved
        });

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (reservation) {
            return res.json({ 
                isReserved: true,
                reservationStatus: reservation.status,
                bookStatus: book.availabilityStatus
            });
        }

        res.json({
            isReserved: false,
            bookStatus: book.availabilityStatus
        });
    } catch (error) {
        console.error('Error checking reservation status for book:', error.message);
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
    checkReservationStatusForBook,
    getUserReservations
};
