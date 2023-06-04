import { Request, Response, NextFunction } from 'express';

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

/* Feature */
//用戶帳號申請
/*
1.{username, email, password, confirmPassword}
*/

/* Feature */

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
