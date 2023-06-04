import { Request, Response, NextFunction } from 'express';
import { IAppError } from '../utils/AppError';

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

// exports.singUp = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.create(req.body);

//     res.status(200).json({
//       result: {
//         // data,
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(`[schema build Error]:${error}`);
//     const newError = new AppError('Test msg', 404);
//     console.log('newError obj:', newError);
//     return next(newError);
//   }
// };

/* Feature */
//用戶帳號申請
/*
1.{username, email, password, confirmPassword}
*/

/* Feature */

//
exports.singUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //catch
    const user = await User.create(req.body);
    if (!user) return next(new AppError('請重新確認填寫訊息', 404));

    res.status(200).json({
      result: {
        // data,
        user,
      },
    });
  }
);
