import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

export const createHandler = (Model: any) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const readAllHandler = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.find({});

    if (!doc) {
      return next(new AppError(`Not Found id:${req.params.id} Model`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const readHandler = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError(`Not Found id:${req.params.id} Model`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const updateHandler = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('test', req.params.id);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(doc);

    if (!doc) {
      return next(new AppError(`Not Found id:${req.params.id} Model`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const deleteHandler = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`Not Found id:${req.params.id} Model`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
