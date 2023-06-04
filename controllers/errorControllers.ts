import { Request, Response, NextFunction } from 'express';
import { IAppError } from '../utils/AppError';

module.exports = (
  err: IAppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //status and statusCode checker
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: 'GlobeErrorHandler Building...',
  });
};
