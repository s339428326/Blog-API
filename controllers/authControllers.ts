import { Request, Response, NextFunction } from 'express';

const User = require('../models/userModel');

/* Feature */
//用戶帳號申請
/*
1.{username, email, password, confirmPassword}
*/

/* Feature */

//until
const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

//
exports.singUp = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // const user = await User.create(req.body);

  //Error handler test

  const testData = {
    email: 'sdasda',
    name: 'sdf',
  };

  const user = await User.create(testData);
  console.log(`build ${user}`);

  res.status(200).json({
    result: {
      data,
      user,
    },
  });
});
