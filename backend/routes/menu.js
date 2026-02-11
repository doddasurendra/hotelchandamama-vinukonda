import express from 'express';
import MenuItem from '../models/MenuItem.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// GET all menu items (for customers - only available items)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isAvailable: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const items = await MenuItem.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all menu items for admin (including unavailable)
router.get('/admin/all', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const items = await MenuItem.find(query)
      .sort({ category: 1, displayOrder: 1, createdAt: -1 })
      .populate('createdBy', 'name email');
    
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE new menu item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const itemData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      spiceLevel: req.body.spiceLevel,
      preparationTime: req.body.preparationTime,
      isAvailable: req.body.isAvailable === 'true',
      isVeg: req.body.isVeg === 'true',
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    };

    // Upload image to Cloudinary if provided
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'hotel-chandamama/menu',
        resource_type: 'image',
      });

      itemData.image = {
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      };
    }

    const menuItem = await MenuItem.create(itemData);
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE menu item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      spiceLevel: req.body.spiceLevel,
      preparationTime: req.body.preparationTime,
      isAvailable: req.body.isAvailable === 'true',
      isVeg: req.body.isVeg === 'true',
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    };

    // Upload new image if provided
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (item.image?.publicId) {
        await cloudinary.uploader.destroy(item.image.publicId);
      }

      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: 'hotel-chandamama/menu',
        resource_type: 'image',
      });

      updateData.image = {
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      };
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE menu item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // Delete image from Cloudinary if exists
    if (item.image?.publicId) {
      await cloudinary.uploader.destroy(item.image.publicId);
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// TOGGLE availability
router.patch('/:id/toggle-availability', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
