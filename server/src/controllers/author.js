const Author = require('../models/author');
const Book = require('../models/book');
const Category = require('../models/category');

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get books by author ID
const getBooksByAuthorId = async (req, res) => {
    const { id } = req.params;
    try {
        const books = await Book.findAll({ where: { authorId: id } }); // Ensure `authorId` is a foreign key in the `Book` model
        res.json(books);
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
    const image = req.file ? req.file.path : null; // Get the image path from the request

    try {
        const author = await Author.create({
            name,
            bio,
            image, // Save the image path
        });

        res.status(201).json(author);
    } catch (error) {
        console.error('Error creating author:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an author
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    const image = req.file ? req.file.path : null; // Get the new image path if uploaded

    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        // Update author fields
        await author.update({
            name: name || author.name,
            bio: bio || author.bio,
            image: image || author.image, // Update image only if a new one is uploaded
        });

        res.json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an author
const deleteAuthor = async (req, res) => {
    const { id } = req.params;

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
    deleteAuthor,
    getBooksByAuthorId
};
