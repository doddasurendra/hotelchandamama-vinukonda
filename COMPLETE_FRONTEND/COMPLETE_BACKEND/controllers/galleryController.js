const Gallery = require('../models/Gallery');
const { uploadImage, deleteImage } = require('../utils/cloudinary');
const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    console.error('Get gallery images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery images'
    });
  }
};

const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image file'
      });
    }

    const uploadResult = await uploadImage(req.file.path, 'hotel-chandamama/gallery');

    if (!uploadResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Error uploading image to cloud'
      });
    }

    const galleryImage = await Gallery.create({
      imageUrl: uploadResult.url,
      publicId: uploadResult.publicId,
      title: req.body.title || ''
    });

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: galleryImage
    });
  } catch (error) {
    console.error('Upload gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image'
    });
  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    if (image.publicId) {
      await deleteImage(image.publicId);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image'
    });
  }
};

module.exports = {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  upload
};
