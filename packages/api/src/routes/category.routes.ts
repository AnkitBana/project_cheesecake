import { Router } from 'express';
import { authenticate, authorize } from '@/middleware/auth';

const router = Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get all categories' });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get category by ID' });
});

router.post('/', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, message: 'Create category' });
});

router.put('/:id', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, message: 'Update category' });
});

router.delete('/:id', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, message: 'Delete category' });
});

export default router;

// Made with Bob
