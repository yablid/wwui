// src/middleware/protect.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/auth/auth';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        req.user = verifyAccessToken(token);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
