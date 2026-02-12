import express from 'express';
const router = express.Router();

// TODO: Implement auth routes

router.get('/', (req, res) => {
  res.json({ success: true, message: 'auth route placeholder' });
});

export default router;
