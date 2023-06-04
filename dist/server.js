"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = require('./app');
dotenv_1.default.config({ path: './config.env' });
mongoose_1.default.connect(`${process.env.NODE_ENV === 'development'
    ? process.env.LOCAL_DATABASE
    : process.env.SERVER_DATABASE}`);
const db = mongoose_1.default.connection;
db.on('error', () => console.log('MongoDB 連結失敗！'));
db.once('open', () => console.log('mongoDB 連結成功！'));
app.listen(process.env.PORT || 5501, () => {
    console.log(`Start! Port:${process.env?.PORT}`);
});
