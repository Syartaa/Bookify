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

        // Update fine fields
        await fine.update({
            amount: amount || fine.amount,
            paymentStatus: paymentStatus || fine.paymentStatus,
            loanId: loanId || fine.loanId,
            userId: userId || fine.userId,
        });

        res.json(fine);
    } catch (error) {
        console.log(error);
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

module.exports = {
    getAllFines,
    getFineById,
    createFine,
    updateFine,
    deleteFine,
};
