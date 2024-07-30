// src/auth/auth.ts
import jwt, { type JwtPayload } from 'jsonwebtoken';
import '../config/private.js';

export interface TokenPayload extends JwtPayload {
    id: string;
    username?: string;
    roles: string[];
}

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error('Token secrets not found');
}

export const generateAccessToken = (user: { id: string, username: string, roles: string[] }) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        roles: user.roles
    }, accessTokenSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: { id: string }) => {
    return jwt.sign({ id: user.id }, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, accessTokenSecret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, refreshTokenSecret) as TokenPayload;
};
