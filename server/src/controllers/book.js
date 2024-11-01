const Author = require('../models/author');
const Book = require('../models/book');
const Cateogory = require('../models/category');
const { Op } = require("sequelize");


// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                { model: Author, attributes: ['id', 'name'] },
                { model: Cateogory, attributes: ['id', 'name'] }
            ],
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a book by ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id, {
        include: [
          { model: Author, attributes: ['id', 'name'] },
          { model: Cateogory, attributes: ['id', 'name'] },
        ],
      });
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Create a new book
const createBook = async (req, res) => {
    console.log(req.body); // Log the request body
    const { title, isbn, publishedDate, availabilityStatus, categoryId, authorId, description,popularity } = req.body;
    const image = req.file ? req.file.path : null; // Get the image path from the request

    try {
        const book = await Book.create({
            title,
            isbn,
            publishedDate,
            availabilityStatus,
            categoryId,
            authorId,
            description,
            popularity,
            image, // Store the image path in the database
        });

        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error.message);
        if (error.errors) {
            error.errors.forEach(err => console.error(err.message)); // Log validation errors
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get popular books
const getPopularBooks = async (req, res) => {
    try {
        const popularBooks = await Book.findAll({
            where: { popularity: { [Op.gt]: 0 } }, // Ensure popularity is greater than 0
            order: [['popularity', 'DESC']],
            limit: 5, // Adjust the limit as needed
            include: [{ model: Author, attributes: ['name'] }], // Include author details
        });
        res.json(popularBooks);
    } catch (error) {
        console.error('Error fetching popular books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Update a book
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, isbn, publishedDate, availabilityStatus, categoryId, authorId,description,popularity } = req.body;
    const image = req.file ? req.file.path : null; // Get the new image path if uploaded

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Update book fields
        await book.update({
            title: title || book.title,
            isbn: isbn || book.isbn,
            publishedDate: publishedDate || book.publishedDate,
            availabilityStatus: availabilityStatus || book.availabilityStatus,
            categoryId: categoryId || book.categoryId,
            authorId: authorId || book.authorId,
            description:description || book.description,
            popularity:popularity || book.popularity,
            image: image || book.image, // Update image only if a new one is uploaded
        });

        res.json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByPk(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await Book.destroy({ where: { id } });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getPopularBooks,
};
