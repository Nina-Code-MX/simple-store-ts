import { Request, Response } from 'express';
import Product from '../models/productModel';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price } = req.body;

    try {
        const product = await Product.create({ name, price });
        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};