"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartControllers_1 = require("../controllers/cartControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post('/add', cartControllers_1.addCart);
router.get('/', cartControllers_1.getCart);
exports.default = router;