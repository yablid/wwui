// src/controllers/changePassword.ts
import { Request, Response } from 'express';

import User from '../models/user.model.js';

export const changePassword = async (req: Request, res: Response) => {

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.comparePassword(oldPassword, async (err, isMatch) => {
        if (err || !isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        user.password = newPassword;
        await user.save();
        return res.status(200).json({ message: 'Password changed successfully' });
    });
};
