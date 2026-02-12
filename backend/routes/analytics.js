import express from 'express';
const router = express.Router();

// TODO: Implement analytics routes

router.get('/', (req, res) => {
  res.json({ success: true, message: 'analytics route placeholder' });
});

export default router;
