const Book = require('../models/book');
const Loan = require('../models/loan');
const User = require('../models/user');

// Get all loans
const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: [
                { model: Book, attributes: ['id', 'title'] },
                { model: User, attributes: ['id', 'name'] }
            ],
        });
        res.json(loans);
    } catch (error) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get a loan by ID
const getLoanById = async (req, res) => {
    const { id } = req.params;
    try {
        const loan = await Loan.findByPk(id, {
            include: [
                { model: Book, attributes: ['id', 'title'] }, // Include Book model
                { model: User, attributes: ['id', 'name'] }   // Include User model
            ],
        });
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json(loan);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// In your backend loan controller

const createLoan = async (req, res) => {
    const { bookId, userId } = req.body;
    const borrowDate = new Date(); // Current date
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Set due date 2 weeks from now

    try {
        // Check if the book is available
        const book = await Book.findByPk(bookId);
        if (!book || book.availabilityStatus !== 'available') {
            return res.status(400).json({ error: 'Book is not available for loan.' });
        }

        // Create the loan
        const loan = await Loan.create({
            borrowDate,
            dueDate,
            bookId,
            userId,
        });

        // Update the book status to "borrowed"
        await book.update({ availabilityStatus: 'borrowed' });

        res.status(201).json(loan);
    } catch (error) {
        console.error('Error creating loan:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Update a loan
const updateLoan = async (req, res) => {
    const { id } = req.params;
    const { borrowDate, returnDate, dueDate, status, bookId, userId } = req.body;

    try {
        const loan = await Loan.findByPk(id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        // Update loan fields
        await loan.update({
            borrowDate: borrowDate || loan.borrowDate,
            returnDate: returnDate || loan.returnDate,
            dueDate: dueDate || loan.dueDate,
            status: status || loan.status,
            bookId: bookId || loan.bookId,
            userId: userId || loan.userId,
        });

        res.json(loan);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a loan
const deleteLoan = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLoan = await Loan.findByPk(id);
        if (!deletedLoan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        await Loan.destroy({ where: { id } });
        res.json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllLoans,
    getLoanById,
    createLoan,
    updateLoan,
    deleteLoan,
};
