const express = require('express');
const router = express.Router();
const multer = require('multer');
const AuthorController = require('../controllers/author');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Change to your desired upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});
const upload = multer({ storage });

// Define routes
router.get('/', AuthorController.getAllAuthors);
router.get('/:id', AuthorController.getAuthorById);
router.post('/', upload.single('image'), AuthorController.createAuthor); // Use multer middleware
router.put('/:id', upload.single('image'), AuthorController.updateAuthor); // Use multer middleware
router.delete('/:id', AuthorController.deleteAuthor);
// Fetch books by author ID
router.get('/:id/books', AuthorController.getBooksByAuthorId);


module.exports = router;
