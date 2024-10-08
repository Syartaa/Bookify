const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const generateToken = require('../../helper/generateToken');
const axios = require('axios');
require('dotenv').config();
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: 'user',
        };

        const token = generateToken(userData);
        
        res.status(200).json({ token, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
