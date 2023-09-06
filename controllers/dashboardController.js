"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const dashboardService_1 = __importDefault(require("../services/dashboardService"));
const utils_1 = __importDefault(require("../utils/utils"));
const dashboardController = {
    quanlityOverview: (0, express_async_handler_1.default)(async (req, res) => {
        const totalAmoutSold = await dashboardService_1.default.totalAmoutSold();
        const totalProductSold = await dashboardService_1.default.totalProductSold();
        const totalProduct = await dashboardService_1.default.totalProduct();
        const totalUser = await dashboardService_1.default.totalUser();
        console.log(totalUser);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy thông tin tổng quan thành công', {
            totalAmoutSold: totalAmoutSold[0],
            totalProduct: totalProduct[0],
            totalProductSold: totalProductSold[0],
            totalUser: totalUser[0]
        }));
    }),
    quantitySoldOverTime: (0, express_async_handler_1.default)(async (req, res) => {
        const purchase = await dashboardService_1.default.quantitySoldOverTime();
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy sản phẩm bán thành công', purchase));
    }),
    notificationOder: (0, express_async_handler_1.default)(async (req, res) => {
        const purchase = await dashboardService_1.default.notificationOder();
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy sản phẩm bán thành công', purchase));
    })
};
exports.default = dashboardController;
