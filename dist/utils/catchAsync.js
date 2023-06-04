"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//until
module.exports =
    (fn) => (req, res, next) => {
        fn(req, res, next).catch(next);
    };
