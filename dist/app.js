"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const userRouter = require('./Routes/userRoutes');
const globeErrorHandler = require('./controllers/errorControllers');
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express_1.default.json());
//router
app.use('/api/v1/users', userRouter);
//Error
app.use(globeErrorHandler);
module.exports = app;
