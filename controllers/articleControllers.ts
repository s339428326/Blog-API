import { NextFunction, Response, Request } from 'express';
import Article from '../models/articleModel';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

export const getAllArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const article = await Article.find();
    if (!article) return next(new AppError('找不到任何文章', 404));

    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  }
);
