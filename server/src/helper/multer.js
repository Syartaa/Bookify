const multer = require("multer");
const path = require("path");

// Storage configuration for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"));
  },
  filename: function (req, file, cb) {
    // Use a unique filename to avoid conflicts
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Image upload middleware
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    // Check if the file is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("File type not supported. Only images are allowed."));
    }
  },
}).single("image"); // Change "image" to match the field name in your form

// Export the image upload middleware
module.exports = { uploadImage };
