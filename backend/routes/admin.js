import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// AI Image Generation using DALL-E style prompt (Free alternative: Hugging Face API)
router.post('/generate-food-image', async (req, res) => {
  try {
    const { itemName, category, description } = req.body;

    // Create detailed prompt for food image
    const prompt = `Professional food photography of ${itemName}, ${category} dish, ${description || 'delicious vegetarian food'}, beautifully plated, high quality, restaurant style, white background, appetizing, well-lit, detailed, 4k quality`;

    // Option 1: Using Hugging Face Inference API (FREE)
    // You need to sign up at huggingface.co and get API token
    const HF_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
    
    if (!HF_API_TOKEN) {
      // Fallback: Return a placeholder food image from Unsplash
      const fallbackImages = {
        'Tiffins': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
        'Meals': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        'Snacks': 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400',
        'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
        'Desserts': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
        'Special': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
      };

      const placeholderUrl = fallbackImages[category] || fallbackImages['Meals'];
      
      return res.json({
        success: true,
        imageUrl: placeholderUrl,
        message: 'Using placeholder image. Configure HUGGINGFACE_API_TOKEN for AI generation.',
      });
    }

    // Call Hugging Face Stable Diffusion API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const imageBlob = await response.blob();
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
    const base64Image = imageBuffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'hotel-chandamama/menu/ai-generated',
      resource_type: 'image',
    });

    res.json({
      success: true,
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      message: 'AI image generated successfully',
    });

  } catch (error) {
    console.error('AI Image Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI image. Using fallback.',
    });
  }
});

// Dashboard Statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    // TODO: Implement actual statistics from database
    const stats = {
      totalOrders: 0,
      todayOrders: 0,
      totalRevenue: 0,
      todayRevenue: 0,
      totalCustomers: 0,
      menuItems: 0,
      pendingOrders: 0,
      completedToday: 0,
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    // TODO: Implement user management
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
