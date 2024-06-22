import { Router } from "express";
import { addCart, getCart } from "../controllers/cartControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.post('/add', addCart);
router.get('/', getCart);

export default router;