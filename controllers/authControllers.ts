import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import User, { IUser } from '../models/userModel';

import jwt from 'jsonwebtoken';

const singToken = (id: string) => {
  if (!process.env.JWT_SECRET) throw new Error('dotenv 沒有設置JWT_SECRET');

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendJwtToClient = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = singToken(user.id);
  const oneDayMillisecond = 24 * 60 * 60 * 1000;

  if (!process.env.COOKIE_EXPIRES_IN)
    throw new Error('dotenv 沒有設置JWT_COOKIE_EXPIRES_IN');

  // cookie(name,token,{..options})
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRES_IN) * oneDayMillisecond
    ),
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('protect');
    next();
  }
);

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

    sendJwtToClient(user, 201, req, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new AppError('登入失敗！， 請從新確認 email 或 password', 400)
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return next(
        new AppError('登入失敗！， 請從新確認 email 或 password', 404)
      );

    const isCorrectPassword = await user.passwordCompare(
      password,
      user.password
    );

    if (isCorrectPassword) {
      sendJwtToClient(user, 201, req, res);
    } else {
      return next(
        new AppError('登入失敗！， 請從新確認 email 或 password', 400)
      );
    }
  }
);

export const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //need email API
    res.status(200).json({
      status: 'success',
      message: '此路由功能建立中..',
    });
  }
);
