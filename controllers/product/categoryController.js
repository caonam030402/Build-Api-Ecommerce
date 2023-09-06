"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const productModel_1 = require("../../models/productModel");
const utils_1 = __importDefault(require("../../utils/utils"));
const categoryController = {
    addCategory: (0, express_async_handler_1.default)(async (req, res) => {
        const category = await productModel_1.CategoryProduct.create(req.body);
        res.status(http_status_1.default.CREATED).json((0, utils_1.default)('Thêm categories thành công', category));
    }),
    getCaregory: (0, express_async_handler_1.default)(async (req, res) => {
        const categories = await productModel_1.CategoryProduct.find();
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy categories thành công', categories));
    })
};
exports.default = categoryController;
