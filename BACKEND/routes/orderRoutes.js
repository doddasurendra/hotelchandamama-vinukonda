const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/', createOrder);

// Protected routes (Admin only)
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrder);
router.put('/:id', authMiddleware, updateOrderStatus);

module.exports = router;
