"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const errorHandlers_1 = require("./errorHandlers");
const verifyToken = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await userModel_1.default.findById(decoded._id);
            if (user !== null) {
                req.user = user;
                next();
            }
        }
        catch (error) {
            throw new errorHandlers_1.ApiError('Token không được ủy quyền đã hết hạn, vui lòng đăng nhập lại', http_status_1.default.UNAUTHORIZED, '');
        }
    }
    else {
        throw new errorHandlers_1.ApiError('Token không tồn tại', http_status_1.default.UNAUTHORIZED, '');
    }
});
const verifyTokenAndAdminAuth = (0, express_async_handler_1.default)(async (req, res, next) => {
    verifyToken(req, res, () => {
        if (!req.user)
            return null;
        if (req.user._id === req.params._id || req.user.roles.includes('Admin')) {
            next();
        }
        else {
            throw new Error('Bạn không phải là Admin');
        }
    });
});
exports.default = { verifyToken, verifyTokenAndAdminAuth };
