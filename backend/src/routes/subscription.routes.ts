import { Router } from 'express';
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription
} from '../controllers/subscription.controller';
import { getSubscriptionTotals } from '../controllers/totals.controller';

const router = Router();

// Ruta de totales debe ir ANTES de /:id para evitar conflictos
router.get('/totals', getSubscriptionTotals);

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscriptionById);
router.post('/', createSubscription);
router.put('/:id', updateSubscription);
router.patch('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
