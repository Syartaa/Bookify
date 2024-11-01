const express = require('express');
const router = express.Router();
const multer = require('multer');
const BookController = require('../controllers/book');

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
router.get('/', BookController.getAllBooks);
router.get('/popularbooks', BookController.getPopularBooks);
router.get('/:id', BookController.getBookById);
router.post('/', upload.single('image'), BookController.createBook); // Use multer middleware
router.put('/:id', upload.single('image'), BookController.updateBook); // Use multer middleware
router.delete('/:id', BookController.deleteBook);

module.exports = router;
