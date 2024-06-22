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
exports.getCart = exports.addCart = void 0;
const cartModel_1 = __importDefault(require("../models/cartModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { productId, quantity } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const product = yield productModel_1.default.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cartItem = yield cartModel_1.default.findOne({ where: { userId, productId } });
        if (cartItem) {
            cartItem.quantity += quantity;
            yield cartItem.save();
        }
        else {
            cartItem = yield cartModel_1.default.create({ userId, productId, quantity });
        }
        res.status(201).json({ message: 'Product added to cart', cartItem });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.addCart = addCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const cartItems = yield cartModel_1.default.findAll({ where: { userId }, include: [productModel_1.default] });
        res.json(cartItems);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.getCart = getCart;
