const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  autoGenerateMenu,
  upload
} = require('../controllers/menuController');
const authMiddleware = require('../middleware/auth');

router.get('/', getMenuItems);
router.post('/', authMiddleware, upload.single('image'), createMenuItem);
router.put('/:id', authMiddleware, upload.single('image'), updateMenuItem);
router.delete('/:id', authMiddleware, deleteMenuItem);
router.post('/auto-generate', authMiddleware, autoGenerateMenu);

module.exports = router;
