const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const uploadDir = path.join(__dirname, 'uploads'); // Path to the uploads directory

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files to the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

const upload = multer({ storage: storage });

app.post('/book', upload.single('image'), createBook);
