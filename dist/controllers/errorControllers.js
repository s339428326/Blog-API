"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
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
            message: '發生不可預起錯誤！',
        });
    }
};
const errorHandler = (err, req, res, next) => {
    console.log('err hd:', process.env.NODE_ENV, err);
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
                return sendError(new AppError_1.default(`${err.message}`.split(': ')[2], 404), req, res, next);
            }
            //body parse error
            if (err.type === 'entity.parse.failed') {
                return sendError(new AppError_1.default('請確認body 是否正確填寫！', 404), req, res, next);
            }
            sendError(err, req, res, next);
            break;
    }
};
exports.default = errorHandler;
