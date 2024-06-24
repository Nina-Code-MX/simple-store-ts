import { Request, Response } from 'express';
import Product from '../models/productModel';

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id, { rejectOnEmpty: true });
        res.json({data: product, message: 'Product found'});
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: 'Product not found', error: err });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: 'Products not found', error: err });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price } = req.body;

    try {
        const product = await Product.create({ name, price });
        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: 'Unable to create Products', error: err });
    }
};