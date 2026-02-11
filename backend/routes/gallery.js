import express from 'express';
const router = express.Router();

// TODO: Implement gallery routes

router.get('/', (req, res) => {
  res.json({ success: true, message: 'gallery route placeholder' });
});

export default router;
