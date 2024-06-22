import { Request, Response } from 'express';
import Stripe from 'stripe';
import Cart from '../models/cartModel';
import Product from '../models/productModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
});

export const checkout = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { token } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const cartItems = await Cart.findAll({ where: { userId }, include: [ Product ] });
        const totalAmount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.Product.price, 0);
        const charge = await stripe.charges.create({
            amount: totalAmount * 100,
            currency: 'usd',
            source: token,
            description: 'Order for user ${userId}'
        });

        await Cart.destroy({ where: { userId } });

        res.json({ message: 'Checkout successful', charge });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};