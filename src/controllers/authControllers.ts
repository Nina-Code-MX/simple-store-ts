import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });

        res.json({ message: 'Logn successful', token });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};
