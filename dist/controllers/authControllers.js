"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = exports.login = exports.singUp = exports.protect = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const singToken = (id) => {
    if (!process.env.JWT_SECRET)
        throw new Error('dotenv 沒有設置JWT_SECRET');
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const sendJwtToClient = (user, statusCode, req, res) => {
    const token = singToken(user.id);
    const oneDayMillisecond = 24 * 60 * 60 * 1000;
    if (!process.env.COOKIE_EXPIRES_IN)
        throw new Error('dotenv 沒有設置JWT_COOKIE_EXPIRES_IN');
    // cookie(name,token,{..options})
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES_IN) * oneDayMillisecond),
        httpOnly: true,
    });
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    console.log('protect');
    next();
});
exports.singUp = (0, catchAsync_1.default)(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    const user = await userModel_1.default.create({
        name,
        email,
        password,
        confirmPassword,
    });
    if (!user)
        return next(new AppError_1.default('請重新確認填寫訊息', 404));
    sendJwtToClient(user, 201, req, res);
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError_1.default('登入失敗！， 請從新確認 email 或 password', 400));
    }
    const user = await userModel_1.default.findOne({ email }).select('+password');
    if (!user)
        return next(new AppError_1.default('登入失敗！， 請從新確認 email 或 password', 404));
    const isCorrectPassword = await user.passwordCompare(password, user.password);
    if (isCorrectPassword) {
        sendJwtToClient(user, 201, req, res);
    }
    else {
        return next(new AppError_1.default('登入失敗！， 請從新確認 email 或 password', 400));
    }
});
exports.forgetPassword = (0, catchAsync_1.default)(async (req, res, next) => {
    //need email API
    res.status(200).json({
        status: 'success',
        message: '此路由功能建立中..',
    });
});
