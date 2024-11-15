const Fine = require('../models/fine');
const Loan = require('../models/loan');
const User = require('../models/user');

// Get all fines
const getAllFines = async (req, res) => {
    try {
        const fines = await Fine.findAll({
            include: [
                { model: Loan, attributes: ['id', 'status'] },
                { model: User, attributes: ['id', 'name'] }
            ],
        });
        res.json(fines);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a fine by ID
const getFineById = async (req, res) => {
    const { id } = req.params;
    try {
        const fine = await Fine.findByPk(id);
        if (!fine) {
            return res.status(404).json({ error: 'Fine not found' });
        }
        res.json(fine);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateFinePaymentStatus = async (req, res) => {
    const { fineId } = req.params;
    const { paymentStatus } = req.body;

    try {
        const fine = await Fine.findByPk(fineId);
        if (!fine) {
            return res.status(404).json({ error: 'Fine not found' });
        }

        // Update the fine's payment status
        await fine.update({ paymentStatus });

        res.json({ message: `Fine payment status updated to ${paymentStatus}.` });
    } catch (error) {
        console.error('Error updating fine:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Create a new fine
const createFine = async (req, res) => {
    const { amount, paymentStatus, loanId, userId } = req.body;

    try {
        const fine = await Fine.create({
            amount,
            paymentStatus,
            loanId,
            userId,
        });

        res.status(201).json(fine);
    } catch (error) {
        console.error('Error creating fine:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a fine
const updateFine = async (req, res) => {
    const { id } = req.params;
    const { amount, paymentStatus, loanId, userId } = req.body;

    try {
        const fine = await Fine.findByPk(id);
        if (!fine) {
            return res.status(404).json({ error: 'Fine not found' });
        }

        // Log the received data for debugging purposes
        console.log('Updating fine with data:', req.body);

        // Update fine fields
        await fine.update({
            amount: amount || fine.amount,
            paymentStatus: paymentStatus || fine.paymentStatus,
            loanId: loanId || fine.loanId,
            userId: userId || fine.userId,
        });

        res.json(fine);
    } catch (error) {
        console.log('Error updating fine:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Delete a fine
const deleteFine = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFine = await Fine.findByPk(id);
        if (!deletedFine) {
            return res.status(404).json({ error: 'Fine not found' });
        }

        await Fine.destroy({ where: { id } });
        res.json({ message: 'Fine deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const payFine = async (req, res) => {
    const { loanId } = req.params;

    try {
        // Find the unpaid fine related to this loan
        const fine = await Fine.findOne({
            where: { loanId, paymentStatus: 'unpaid' },
        });

        if (!fine) {
            return res.status(404).json({ error: 'No unpaid fine found for this loan' });
        }

        // Mark the fine as paid
        await fine.update({ paymentStatus: 'paid' });

        return res.json({ message: 'Fine paid successfully' });
    } catch (error) {
        console.error('Error paying fine:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllFines,
    getFineById,
    createFine,
    updateFine,
    deleteFine,
    updateFinePaymentStatus,
    payFine
};
