import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });

        res.status(201).json({ message: 'User created', data: { token, id: user.id, email: user.email } });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message, data: [] });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Invalid email or password', data: [] });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });

        res.json({ message: 'Logn successful', data: { token, id: user.id, email: user.email } });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
};
