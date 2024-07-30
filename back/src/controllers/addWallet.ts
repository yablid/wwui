// src/controllers/addWallet.ts
import { Request, Response } from 'express';
import WalletModel from '../models/wallet.model';
import { MongoError } from 'mongodb';
import { verifyAccessToken } from '@/auth/auth';

export const addWallet = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ message: 'Authorization Header Missing or Malformed' });
  }
  const tokenPayload = verifyAccessToken(accessToken);
  const sponsor = tokenPayload.username;

  try {
    const { address, twitter, label, nickname, notes } = req.body;

    const existingWallet = await WalletModel.findOne({ address });

    if (existingWallet) {
      // Update existing wallet without changing address or time_created
      existingWallet.twitter = twitter;
      existingWallet.label = label;
      existingWallet.nickname = nickname;
      existingWallet.notes = notes;
      existingWallet.sponsor = sponsor || '';
      existingWallet.time_updated = new Date();

      await existingWallet.save();

      return res.status(200).json({ message: 'Wallet updated', wallet: existingWallet });
    } else {
      // Create a new wallet
      const newWallet = new WalletModel({
        address,
        twitter,
        label,
        nickname,
        notes,
        sponsor,
        time_created: new Date(),
        time_updated: new Date(),
      });

      await newWallet.save();

      return res.status(201).json({ message: 'Wallet added', wallet: newWallet });
    }
  } catch (error) {
    console.log("addWallet error", error);

    if (error instanceof MongoError) {
      if (error.code === 11000 || error.code === 11001) {
        return res.status(409).json({ message: 'Duplicate entry detected', error });
      }
    }

    return res.status(500).json({ message: 'Server error', error });
  }
};
