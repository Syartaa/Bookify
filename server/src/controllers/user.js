const User = require('../models/user');  // Import the User model

// Get all users (for listing in the dashboard)
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
};

// Get a single user by ID (for editing purposes)
exports.getUserById = async (req, res, next) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve the user' });
    }
};

// Edit user details
exports.updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, phone, password, role } = req.body;
    
    try {
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.password = password || user.password;
        user.role = role || user.role;
        
        await user.save();
        
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update the user' });
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete the user' });
    }
};
