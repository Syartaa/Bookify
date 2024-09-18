const User = require('../models/user');
const bcrypt = require('bcrypt')
const axios = require('axios');
require('dotenv').config();

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id); 
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error.message); // More detailed error logging
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Update an user
const updateuser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone,  password} = req.body; // Include password here if needed
    try {
        const user = await user.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        // Check if password is included and hash it
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user fields
        await user.update({
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            password: hashedPassword || user.password, // Update password only if provided
        });

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Delete an user
const deleteUser = async (req, res) => {
    const { id } = Number(req.params);
    try {
    
        const deletedUser = await User.findByPk(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'user not found' });
        }
        await User.destroy({ where: { id } });
        res.json({ message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateuser,
    deleteUser
}