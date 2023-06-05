import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import User from '../models/userModel';

/*
1.{username, email, password, confirmPassword}
*/

//
export const singUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!user) return next(new AppError('請重新確認填寫訊息', 404));

    res.status(200).json({
      result: {
        user,
      },
    });
  }
);
