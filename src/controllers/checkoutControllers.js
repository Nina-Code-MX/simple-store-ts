"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const stripe_1 = __importDefault(require("stripe"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10'
});
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { token } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const cartItems = yield cartModel_1.default.findAll({ where: { userId }, include: [productModel_1.default] });
        const totalAmount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.Product.price, 0);
        const charge = yield stripe.charges.create({
            amount: totalAmount * 100,
            currency: 'usd',
            source: token,
            description: 'Order for user ${userId}'
        });
        yield cartModel_1.default.destroy({ where: { userId } });
        res.json({ message: 'Checkout successful', charge });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.checkout = checkout;
