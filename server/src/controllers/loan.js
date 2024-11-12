const Book = require('../models/book');
const Fine = require('../models/fine');
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
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Set due date 2 weeks from now

    try {
        // Check if the book is available
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the book is already loaned out
        const existingLoan = await Loan.findOne({ where: { bookId, returnDate: null } });
        if (existingLoan) {
            return res.status(400).json({ error: 'Book is already loaned out' });
        }

        // Create a new loan
        const loan = await Loan.create({
            bookId,
            userId,
            borrowDate,
            dueDate,
            returnDate: null, // Not returned yet
        });

        res.status(201).json({ message: 'Loan created successfully', loan });
    } catch (error) {
        console.error("Error creating loan:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// Update a loan


const updateLoan = async (req, res) => {
    const { id } = req.params;
    const { returnDate } = req.body;

    try {
        const loan = await Loan.findByPk(id, {
            include: [{ model: Book, attributes: ['id', 'title', 'availabilityStatus'] }],
        });

        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        // Update return date and calculate fine if overdue
        let fineAmount = 0;
        if (returnDate) {
            const returnDateObj = new Date(returnDate);
            const dueDateObj = new Date(loan.dueDate);

            if (returnDateObj > dueDateObj) {
                const diffTime = Math.abs(returnDateObj - dueDateObj);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate days late
                fineAmount = diffDays * 1; // Assuming $1 fine per day late

                // Create a new fine entry
                await Fine.create({
                    amount: fineAmount,
                    loanId: loan.id,
                    userId: loan.userId,
                    paymentStatus: 'unpaid',
                });
            }

            // Update the loan's return date and status
            await loan.update({
                returnDate: returnDateObj,
                status: 'returned',
            });

            // Update the book's availability status to 'available'
            await Book.update(
                { availabilityStatus: 'available' },
                { where: { id: loan.bookId } }
            );

            return res.json({
                loan,
                fine: fineAmount > 0 ? `You have a fine of $${fineAmount}` : 'No fine',
            });
        }

        res.json({ loan, message: 'Loan updated without return.' });
    } catch (error) {
        console.error('Error updating loan:', error);
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

// Check if a book is borrowed by another user
const checkIfBookIsBorrowed = async (req, res) => {
    const { bookId, userId } = req.params;

    try {
        // Find a loan record for the book where it’s not returned yet
        const loan = await Loan.findOne({
            where: { bookId, returnDate: null },
            include: [{ model: Book, attributes: ['id', 'title', 'availabilityStatus'] }]
        });

        if (loan) {
            // If the loan exists and the book is borrowed by a different user
            const isBorrowedByOtherUser = loan.userId !== parseInt(userId);
            return res.json({ isBorrowed: true, borrowedByAnotherUser: isBorrowedByOtherUser });
        }

        // If no active loan found, book is not borrowed
        res.json({ isBorrowed: false });
    } catch (error) {
        console.error('Error checking if book is borrowed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllLoans,
    getLoanById,
    createLoan,
    updateLoan,
    deleteLoan,
    checkIfBookIsBorrowed,
};
