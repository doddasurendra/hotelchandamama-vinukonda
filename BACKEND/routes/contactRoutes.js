const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  deleteContact
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/', createContact);

// Protected routes (Admin only)
router.get('/', authMiddleware, getContacts);
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;
