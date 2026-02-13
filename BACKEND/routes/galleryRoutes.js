const express = require('express');
const router = express.Router();
const {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  upload
} = require('../controllers/galleryController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', getGalleryImages);

// Protected routes (Admin only)
router.post('/', authMiddleware, upload.single('image'), uploadGalleryImage);
router.delete('/:id', authMiddleware, deleteGalleryImage);

module.exports = router;
