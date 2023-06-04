"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const isStrongPassword_1 = __importDefault(require("validator/lib/isStrongPassword"));
const userModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, '用戶必須含有名稱']
    },
    email: {
        type: String,
        trim: true,
        required: [true, '用戶必須含有名稱'],
        validate: [isEmail_1.default, '請輸入有效信箱']
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        validate: [
            function (val) {
                return (0, isStrongPassword_1.default)(val, {
                    minLowercase: 1
                });
            },
            '密碼最少8個字元, 並包含一個小寫英文字母'
        ],
        select: false,
    },
    confirmPassword: {
        type: String,
        validate: [
            function (val) {
                return val === this.confirmPassword;
            },
            '請確認密碼輸入是否相同'
        ]
    }
});
const User = mongoose_1.default.model('User', userModel);
