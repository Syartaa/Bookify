const Author = require('../models/author');

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get an author by ID
const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new author
const createAuthor = async (req, res) => {
    const { name, bio } = req.body;

    try {
        const author = await Author.create({
            name,
            bio,
        });

        res.status(201).json(author);
    } catch (error) {
        console.error('Error creating author:', error.message); // More detailed error logging
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an author
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        // Update author fields
        await author.update({
            name: name || author.name,
            bio: bio || author.bio,
        });

        res.json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an author
const deleteAuthor = async (req, res) => {
    const { id } = req.params; // No need for Number() since id is already a string

    try {
        const deletedAuthor = await Author.findByPk(id);
        if (!deletedAuthor) {
            return res.status(404).json({ error: 'Author not found' });
        }

        await Author.destroy({ where: { id } });
        res.json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
