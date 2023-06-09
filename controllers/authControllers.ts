import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';

import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import { singToken } from '../utils/JWTHandler';
import loginBlock, { printWattlingTime } from '../utils/loginBlock';

import User, { IUser } from '../models/userModel';

import jwt from 'jsonwebtoken';

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

/* 開發中 */

//feat: send email to client
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

//feat: phone auth number
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new AppError('登入失敗！， 請從新確認 email 或 password', 400)
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log(user, email);
      return next(
        new AppError('登入失敗！， 請從新確認 email 或 password', 404)
      );
    }

    const isCorrectPassword = await user.passwordCompare(
      password,
      user.password
    );

    const isUserBlock = loginBlock(user, isCorrectPassword, 60 * 60 * 1000, 10);
    await user.save({ validateBeforeSave: false });

    if (isUserBlock) {
      return next(
        new AppError(
          `此帳戶嘗試多次登入請等待 ${printWattlingTime(
            user,
            60 * 60 * 1000
          )} 分鐘`,
          401
        )
      );
    }

    if (user && isCorrectPassword) {
      user.tryLoginCount = 0;
      await user.save({ validateBeforeSave: false });
      sendJwtToClient(user, 201, req, res);
    } else {
      return next(
        new AppError('登入失敗！， 請從新確認 email 或 password', 401)
      );
    }
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('protect');
    const { authorization } = req.headers;
    let token;

    //Postman Test using
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
      //for client
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!process.env.JWT_SECRET) throw Error('請設定dotenv 文件');

    //1.確認token 是否存在
    if (!token) return next(new AppError('您還未登入！', 401));

    // @ts-ignore
    const { id, iat } = await promisify(jwt.verify)(
      token,
      // @ts-ignore
      process.env.JWT_SECRET
    );

    const user = await User.findById(id);

    if (user?.changedPasswordAfter(iat))
      return next(new AppError('密碼已更改請重新嘗試登入', 403));

    // @ts-ignore
    req.user = user;

    next();
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //1. user data
    // @ts-ignore
    const { id } = req.user;

    const {
      currentPassword,
      password,
      confirmPassword,
    }: { currentPassword: string; password: string; confirmPassword: string } =
      req.body;

    if (!currentPassword || !password || !confirmPassword)
      return next(new AppError('請確認是否有未填欄位', 401));

    if (password !== confirmPassword)
      return next(
        new AppError('請確認輸入更改密碼與確認更改密碼是否一致', 401)
      );

    const user = await User.findById(id).select('+password');
    if (!user) return next(new AppError('用戶已被註銷，請重新登入！', 403));

    const isCorrectPassword = await user?.passwordCompare(
      currentPassword, // 用戶輸入密碼
      user.password //MongoDB 上 bcrypt 加密密碼
    );

    if (!isCorrectPassword)
      return next(new AppError('請確認輸入當前的密碼是否正確', 401));

    user.password = password;

    await user.save({ validateBeforeSave: false });

    sendJwtToClient(user, 200, req, res);
  }
);

/*未開發 */
//feat: send email to client
export const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: '此路由功能建立中..',
    });
  }
);
