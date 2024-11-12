const express = require('express');
const router = express.Router();
const multer = require('multer');
const articleController = require('../controllers/article');

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
router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', upload.single('image'), articleController.createArticle); // Use multer middleware
router.put('/:id', upload.single('image'), articleController.updateArticle); // Use multer middleware
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
