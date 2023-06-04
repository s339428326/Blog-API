"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, '用戶必須含有名稱'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, '用戶必須含有名稱'],
        validate: [validator_1.default.isEmail, '請輸入有效信箱'],
    },
    password: {
        type: String,
        trim: true,
        minLength: 6,
        validate: [
            function (val) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val);
            },
            '密碼最少8個字元, 並包含一個小寫英文字母',
        ],
        select: false,
    },
    confirmPassword: {
        type: String,
        validate: [
            function (val) {
                return val === this.password;
            },
            '請確認密碼輸入是否相同',
        ],
    },
}, {
    toJSON: { virtuals: true },
    strict: true, //(重要)除了設計中的資料欄位，其他不會儲存到MongoDB中
});
const User = mongoose_1.default.model('User', userSchema);
module.exports = User;
