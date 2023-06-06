"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
if (process.env.NODE_ENV === 'development') {
    dotenv_1.default.config({ path: './.env.development' });
}
else {
    dotenv_1.default.config();
}
mongoose_1.default.connect(`${process.env.DATABASE}`);
const db = mongoose_1.default.connection;
db.on('error', () => console.log('MongoDB 連結失敗！'));
db.once('open', () => console.log('mongoDB 連結成功！'));
const server = app_1.default.listen(process.env.PORT || 5501, () => {
    console.log(process.env.NODE_ENV);
    console.log(`Start! Port:${process.env.PORT}`);
});
//發生全域的連線錯誤
process.on('unhandledRejection', (err) => {
    console.log('[contention error]', err.name, err.message);
    console.log('發生不可以預期錯誤unhandledRejection被觸發，已嘗試關閉應用程序');
    server.close(() => {
        process.exit(1);
    });
});
