"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'doesnt exist any token',
        });
    }
    try {
        const { name, uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.name = name;
        req.uid = uid;
    }
    catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token',
        });
    }
    next();
};
exports.validateJWT = validateJWT;
