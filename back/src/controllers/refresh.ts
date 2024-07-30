// src/controllers/auth.ts
import { Request, Response } from 'express';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '@/auth/auth';
import User from '@/models/user.model';

export const refresh = async (req: Request, res: Response): Promise<Response> => {
    console.log('hit refresh endpoint')
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    let user = null;

    try {
        const userPayload = verifyRefreshToken(refreshToken);
        user = await User.findById(userPayload.id);
    } catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const newAccessToken = generateAccessToken({
        id: user._id.toString(),
        username: user.username,
        roles: user.roles }
    );
    const newRefreshToken = generateRefreshToken({id: user._id.toString()});

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        sameSite: 'none',
        secure: true,
        path: '/api'
    });

    return res.json({
        accessToken: newAccessToken,
        id: user._id.toString(),
        username: user.username,
        roles: user.roles
    })
};
