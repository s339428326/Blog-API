"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError = require('../utils/AppError');
const sendError = (err, req, res, next) => {
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
            message: '發生不可預期的錯誤，目前為開發版本未設有回報功能',
        });
    }
};
const errorHandler = (err, req, res, next) => {
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
            //marker normal Error
            if (err.name === 'ValidationError') {
                sendError(new AppError(`${err.message}`.split(': ')[2], 404), req, res, next);
            }
            break;
    }
};
module.exports = errorHandler;
