"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils/utils"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const omit_1 = __importDefault(require("lodash/omit"));
const userService_1 = __importDefault(require("../services/userService"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const errorHandlers_1 = require("../middlewares/errorHandlers");
const userController = {
    getUser: (0, express_async_handler_1.default)(async (req, res) => {
        const user = (0, omit_1.default)(req.user, 'password');
        const responseUser = (0, omit_1.default)(user.toObject(), 'password');
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy người dùng thành công', responseUser));
    }),
    updateUser: (0, express_async_handler_1.default)(async (req, res) => {
        const user = (0, omit_1.default)(req.user, 'password');
        const { password, new_password, ...body } = req.body;
        let updateUser;
        if (password && new_password) {
            const isPasswordMatch = await req.user?.isPasswordMatch(req.body.password);
            if (!isPasswordMatch) {
                res.status(http_status_1.default.BAD_REQUEST).json({
                    data: {
                        message: 'Password không khớp'
                    }
                });
            }
            req.user?.password === new_password;
            if (req.user) {
                updateUser = await userService_1.default.updateUserById(user?._id, req.user);
            }
        }
        else {
            updateUser = await userService_1.default.updateUserById(user?._id, body);
        }
        const responseUser = (0, omit_1.default)(updateUser?.toObject(), 'password');
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Cập nhập người dùng thành công', responseUser));
    }),
    uploadAvatar: (0, express_async_handler_1.default)(async (req, res) => {
        const file = Array.isArray(req.files) ? req.files[0] : req.files;
        if (!file) {
            throw new errorHandlers_1.ApiError('Tệp tin không tồn tại', http_status_1.default.UNPROCESSABLE_ENTITY, 'data');
        }
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Upload ảnh đại diện thành công', file.filename));
    }),
    getAvatar: (0, express_async_handler_1.default)(async (req, res) => {
        const filename = req.params.filename;
        const uploadsPath = path_1.default.join(__dirname, '..', 'uploads');
        const imagePath = path_1.default.join(uploadsPath, filename);
        if (!fs_1.default.existsSync(imagePath)) {
            throw new errorHandlers_1.ApiError('Tệp tin không tồn tại', http_status_1.default.NOT_FOUND, 'data');
        }
        res.sendFile(imagePath);
    }),
    getAddress: (0, express_async_handler_1.default)(async (req, res) => {
        const address = await userService_1.default.getAllAddress();
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy địa chỉ thành công', address));
    })
};
exports.default = userController;
