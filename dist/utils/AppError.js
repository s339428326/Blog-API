"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        //屏蔽此錯誤stack的訊息
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
