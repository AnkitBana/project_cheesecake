import { Router } from 'express';
import { authenticate } from '@/middleware/auth';

const router = Router();

// All payment routes require authentication
router.use(authenticate);

router.post('/create-intent', (req, res) => {
  res.json({ success: true, message: 'Create Stripe payment intent' });
});

router.post('/webhook', (req, res) => {
  res.json({ success: true, message: 'Handle Stripe webhook' });
});

export default router;

// Made with Bob
