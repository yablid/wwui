// src/controllers/login.ts

import { Request, Response } from 'express';

import User from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from "@/auth/auth";

export const login = async (req: Request, res: Response) => {

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
      return res.status(401).json({'message': 'User not found'});
  }

  user.comparePassword(password, async (err, isMatch) => {

    if (err) {
        return res.status(500).json({'message': 'Server error'});
    }
    if (!isMatch) {
        return res.status(401).json({'message': 'Wrong password'});
    }

    const accessToken = generateAccessToken({
        id: user._id.toString(),
        username: user.username,
        roles: user.roles
    });
    const refreshToken = generateRefreshToken({ id: user._id.toString() });

    user.refreshToken.push(refreshToken);
    await user.save();

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'none',
        secure: true,
        path: '/api'
    })
    return res.status(200).json({accessToken});
  });
};

