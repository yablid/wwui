// src/controllers/logout.ts
import { Request, Response } from 'express';

import { verifyRefreshToken} from "@/auth/auth";
import User from '../models/user.model.js';

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token not found' });
    }

    try {
        const userPayload = verifyRefreshToken(refreshToken);

        // Find the user and remove the refresh token
        const user = await User.findById(userPayload.id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.refreshToken = user.refreshToken.filter(rt => rt !== refreshToken);
        await user.save();

        // Clear the refresh token cookie
        res.clearCookie('refreshToken', { path: '/api' });

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        return res.status(400).json({ message: 'Invalid refresh token' });
    }
};
