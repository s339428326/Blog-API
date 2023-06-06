"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//until
exports.default = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
