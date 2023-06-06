"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const limiter_1 = __importDefault(require("./utils/limiter"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const errorControllers_1 = __importDefault(require("./controllers/errorControllers"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(limiter_1.default);
//router
app.use('/api/v1/users', userRoutes_1.default);
//Error
app.use(errorControllers_1.default);
exports.default = app;
