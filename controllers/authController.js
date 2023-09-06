"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const authService_1 = __importDefault(require("../services/authService"));
const tokenService_1 = __importDefault(require("../services/tokenService"));
const userService_1 = __importDefault(require("../services/userService"));
const utils_1 = __importDefault(require("../utils/utils"));
const keyCookie_1 = require("../constants/keyCookie");
const lodash_1 = require("lodash");
const authController = {
    register: (0, express_async_handler_1.default)(async (req, res, next) => {
        const user = req.body;
        try {
            const newUser = await userService_1.default.createUser(user);
            const refrectToken = `Bearer ${tokenService_1.default.generateRefreshToken(newUser._id)}`;
            const accessToken = `Bearer ${tokenService_1.default.generateToken(newUser._id)}`;
            const refrestTokenKeyCookie = keyCookie_1.keyCookie.refrest_token;
            res.cookie(refrestTokenKeyCookie, accessToken);
            res.status(http_status_1.default.CREATED).json((0, utils_1.default)('Đăng kí thành công', {
                user: (0, lodash_1.omit)(newUser.toObject(), 'password'),
                access_token: accessToken,
                refresh_token: refrectToken,
                expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
                expires_refresh_token: process.env.ACCESS_TOKEN_EXPIRES_IN
            }));
        }
        catch (error) {
            next(error);
        }
    }),
    login: (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const user = await authService_1.default.loginWithEmail({ email, password });
        const refrectToken = `Bearer ${tokenService_1.default.generateRefreshToken(user._id)}`;
        const accessToken = `Bearer ${tokenService_1.default.generateToken(user._id)}`;
        const refrestTokenKeyCookie = keyCookie_1.keyCookie.refrest_token;
        res.cookie(refrestTokenKeyCookie, accessToken);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Đăng nhập thành công', {
            access_token: accessToken,
            expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
            refresh_token: refrectToken,
            expires_refresh_token: process.env.ACCESS_TOKEN_EXPIRES_IN,
            user: (0, lodash_1.omit)(user.toObject(), 'password')
        }));
    }),
    logout: (0, express_async_handler_1.default)(async (req, res) => {
        res.clearCookie(keyCookie_1.keyCookie.refrest_token);
        res.status(http_status_1.default.OK).json({ message: 'Đăng xuất thành công' });
    }),
    refrestToken: (0, express_async_handler_1.default)(async (req, res) => {
        const refreshToken = req.body.refresh_token;
        const user = await tokenService_1.default.verifiToken(refreshToken, 'refresh_token');
        if (!user)
            throw new Error('Người dùng chưa đăng nhập');
        // const newRefrestToken = `Bearer ${tokenService.generateRefreshToken((await user)._id)}`
        const newAccessToken = `Bearer ${tokenService_1.default.generateToken((await user)._id)}`;
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Refresh thành công token', { access_token: newAccessToken }));
    })
};
exports.default = authController;
