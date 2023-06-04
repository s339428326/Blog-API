"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.singUp = catchAsync(async (req, res, next) => {
    //catch
    const user = await User.create(req.body);
    if (!user) {
        console.log('schema build Error');
        return next(new AppError('Test msg', 404));
    }
    console.log(`build ${user}`);
    res.status(200).json({
        result: {
            // data,
            user,
        },
    });
});
