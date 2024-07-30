// src/controllers/register.ts
import { Request, Response } from 'express';

import User from '../models/user.model';
import { generateAccessToken, generateRefreshToken } from "@/auth/auth";

export const register = async (req: Request, res: Response) => {

  // Disable or not
  // return res.status(503).json({'message': 'Registration is currently disabled. Please contact p2c2e.'});

  const { username, password } = req.body;
  if ( !username || !password ) {
    return res.status(400).json({'message': 'User or pass emtpy'});
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({'message': 'User already exists'});
  }

  const user = new User({ username, password, roles:['user']});
  await user.save();

  const accessToken = generateAccessToken({
    id: user._id.toString(),
    username: user.username,
    roles: user.roles
  });

  const refreshToken = generateRefreshToken({id: user._id.toString(),});

  user.refreshToken.push(refreshToken);
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'none',
    secure: true,
    path: '/api'
  })

  return res.status(201).json({accessToken});
};
