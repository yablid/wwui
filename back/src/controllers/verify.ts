// src/controllers/verify.ts
import { Request, Response } from 'express';
import { verifyAccessToken } from '@/auth/auth';

export const verify = async (req: Request, res: Response): Promise<Response> => {

    console.log("Hit verify endpoint")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization Header Missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Improper Header Format - no token' });
    }

    try {
        const user = verifyAccessToken(token);
        console.log("Verify returning User: ", user)
        return res.json({ user });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

};
