import { Router } from 'express';
import { authenticate, authorize } from '@/middleware/auth';

const router = Router();

// All order routes require authentication
router.use(authenticate);

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get user orders' });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get order by ID' });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create order' });
});

// Admin routes
router.get('/admin/all', authorize('ADMIN'), (req, res) => {
  res.json({ success: true, message: 'Get all orders (admin)' });
});

router.patch('/:id/status', authorize('ADMIN'), (req, res) => {
  res.json({ success: true, message: 'Update order status' });
});

export default router;

// Made with Bob
