import { Request, Response, NextFunction } from 'express';
import { IAppError } from '../utils/AppError';

const AppError = require('../utils/AppError');

//devSend
//prodSend

module.exports = (
  err: IAppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //status and statusCode checker
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (err.isOperational) {
    return next(new AppError('Test op Error', 404));
  }

  //   res.status(err.statusCode).json({
  //     status: err.status,
  //     message: 'GlobeErrorHandler Building...',
  //   });
};
