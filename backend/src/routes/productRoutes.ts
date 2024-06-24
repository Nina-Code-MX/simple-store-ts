import { Router } from 'express';
import { getProduct, getProducts, createProduct } from '../controllers/productControllers';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProduct);

export default router;