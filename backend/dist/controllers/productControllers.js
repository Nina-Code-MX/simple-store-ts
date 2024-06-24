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
exports.createProduct = exports.getProducts = exports.getProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productModel_1.default.findByPk(id, { rejectOnEmpty: true });
        res.json({ data: product, message: 'Product found' });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: 'Product not found', error: err });
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: 'Products not found', error: err });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    try {
        const product = yield productModel_1.default.create({ name, price });
        res.status(201).json({ message: 'Product created', product });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: 'Unable to create Products', error: err });
    }
});
exports.createProduct = createProduct;
