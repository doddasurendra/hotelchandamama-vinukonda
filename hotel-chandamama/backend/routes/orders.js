import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// CREATE new order
router.post('/', async (req, res) => {
  try {
    const orderNumber = `ORD${Date.now()}`;
    const order = await Order.create({ ...req.body, orderNumber });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customer items.menuItem').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
