"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Feature */
//用戶帳號申請
/*
1.{username, email, password, confirmPassword}
*/
/* Feature */
//until
exports.catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
//
exports.singUp = async (req, res) => {
    const data = req.body;
    res.status(200).json({
        result: {
            data
        }
    });
};
