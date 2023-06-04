import { Request, Response, NextFunction } from 'express';

//until
module.exports =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
