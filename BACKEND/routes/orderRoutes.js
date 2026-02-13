const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.post('/', createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrder);
router.put('/:id', authMiddleware, updateOrderStatus);

module.exports = router;
