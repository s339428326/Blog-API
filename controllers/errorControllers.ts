import { ErrorRequestHandler } from 'express';

import AppError from '../utils/AppError';

const sendError: ErrorRequestHandler = (err, req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.error(`[ERROR LOG]`, err);
    return res.status(500).json({
      status: 'err',
      message: '發生不可預起錯誤！',
    });
  }
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //status and statusCode checker
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  switch (process.env.NODE_ENV) {
    case 'development':
      res.status(err.statusCode).json({
        status: err.status,
        err,
        message: err.message,
        stack: err.stack,
      });
      break;
    case 'production':
      //例外錯誤
      //mongoose schema validation error
      if (err.name === 'ValidationError') {
        //schema fields duplicate key
        if (err._message === 'User validation failed') {
          const errorDuplicateArr: {
            name: string;
            message: string;
          }[] = [];

          Object.entries(err.errors).forEach(
            ([name, errorObj]: [string, any]) => {
              errorDuplicateArr.push({
                name,
                message: errorObj.properties.message,
              });
            }
          );

          return res.status(401).json({
            status: 'fail',
            message: '填寫表單中有錯誤請確認',
            data: {
              data: errorDuplicateArr,
            },
          });
        }

        //normal validation error
        return sendError(
          new AppError(`${err.message}`.split(': ')[2], 404),
          req,
          res,
          next
        );
      }
      //body parse error
      if (err.type === 'entity.parse.failed') {
        return sendError(
          new AppError('請確認body 是否正確填寫！', 404),
          req,
          res,
          next
        );
      }
      //id schema id錯誤
      if (err.kind === 'ObjectId' && err.name === 'CastError') {
        return res
          .status(403)
          .json({ status: 'error', message: '請確認 /:id 是否正確' });
      }
      // res.status(401).json({ message: '這是測試用', err });
      sendError(err, req, res, next);

      break;
  }
};

export default errorHandler;
