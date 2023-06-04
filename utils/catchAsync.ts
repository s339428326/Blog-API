import { Request, Response, NextFunction } from 'express';

//until
const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

module.exports = catchAsync;
