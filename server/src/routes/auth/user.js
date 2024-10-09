const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user"); // Path to your User model
const router = express.Router();
const generateToken = require("../../helper/generateToken");

// Registration route for User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            email,
            phone, // Include phone in user creation
            password: hashedPassword,
            role,
        });

        // Generate a token for the new user
        const token = generateToken({ id: user.id, role: user.role });

        // Respond with the token and user data
        res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login route for User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare the password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate a token for the user
        const token = generateToken({ id: user.id, role: user.role });

        // Respond with the token and user data
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
