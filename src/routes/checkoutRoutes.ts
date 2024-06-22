import { Router } from 'express';
import { checkout } from '../controllers/checkoutControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);
router.post('/', checkout);

export default router;