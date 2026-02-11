import express from 'express';
const router = express.Router();

// TODO: Implement catering routes

router.get('/', (req, res) => {
  res.json({ success: true, message: 'catering route placeholder' });
});

export default router;
