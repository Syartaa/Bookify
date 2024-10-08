const Category = require('../models/category');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = await Category.create({
            name,
            description,
        });

        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error.message); // More detailed error logging
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Update category fields
        await category.update({
            name: name || category.name,
            description: description || category.description,
        });

        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params; // No need for Number() since id is already a string

    try {
        const deletedCategory = await Category.findByPk(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await Category.destroy({ where: { id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
