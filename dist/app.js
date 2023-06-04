"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const userRouter = require("./Routes/userRoutes");
const app = (0, express_1.default)();
app.use(morgan('dev'));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('<h1>Blog API</h1>');
});
app.use('/api/v1/users', userRouter);
module.exports = app;
