"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const purchaseModel_1 = require("../models/purchaseModel");
const purchaseService_1 = __importDefault(require("../services/purchaseService"));
const utils_1 = __importDefault(require("../utils/utils"));
const purchaseController = {
    addToCart: (0, express_async_handler_1.default)(async (req, res) => {
        const { product_id, buy_count } = req.body;
        if (req.user !== undefined) {
            const purchase = await purchaseService_1.default.addToCart({ product_id, buy_count }, req.user);
            res.status(http_status_1.default.OK).json((0, utils_1.default)('Thêm sản phẩm vào giỏ hàng thành công', purchase));
        }
    }),
    getUserPurchase: (0, express_async_handler_1.default)(async (req, res) => {
        const status = req.query.status;
        const user = req.user;
        const purchaseList = await purchaseService_1.default.getPurchasesWithStatus(Number(status), user?._id);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy đơn hàng thành công', purchaseList));
    }),
    deletePurchase: (0, express_async_handler_1.default)(async (req, res) => {
        const _ids = req.body;
        const purchase = await purchaseModel_1.Purchase.deleteMany({ _id: { $in: _ids } });
        res
            .status(http_status_1.default.OK)
            .json((0, utils_1.default)(`Xóa ${purchase.deletedCount} đơn thành công $`, { delete_count: purchase.deletedCount }));
    }),
    buyProduct: (0, express_async_handler_1.default)(async (req, res) => {
        const purchasesBody = req.body;
        const purchase_ids = purchasesBody.map((purchase) => purchase.purchase_id);
        const purchases = purchaseService_1.default.buyProduct(purchase_ids);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Mua thành công', purchases));
    }),
    updatePurchase: (0, express_async_handler_1.default)(async (req, res) => {
        const { product_id, purchase_id, ...updateBody } = req.body;
        const purchase = await purchaseService_1.default.updatePurchase(product_id, updateBody, purchase_id);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Mua hàng thành công', purchase));
    }),
    getPurchasesWithParam: (0, express_async_handler_1.default)(async (req, res) => {
        const status = req.params.status;
        const purchases = await purchaseService_1.default.getPurchasesWithStatus(Number(status), null);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy đơn mua thành công', purchases));
    })
};
exports.default = purchaseController;
