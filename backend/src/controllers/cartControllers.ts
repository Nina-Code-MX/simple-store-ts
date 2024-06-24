import { Request, Response } from 'express';
import Cart from '../models/cartModel';
import Product from '../models/productModel';

export const addCart = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const userId = req.user?.userId;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, productId, quantity });
        }

        res.status(201).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
};

export const getCart = async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    try {
        const cartItems = await Cart.findAll({ where: { userId }, include: [ { model: Product, as: 'Product' } ] });
        res.json({ message: `Products loaded`, data: cartItems});
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
};
