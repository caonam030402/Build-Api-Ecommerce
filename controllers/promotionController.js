"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const utils_1 = __importDefault(require("../utils/utils"));
const promotionService_1 = require("../services/promotionService");
const promotionController = {
    getPromotions: (0, express_async_handler_1.default)(async (req, res) => {
        const promotionId = req.query.promotionId;
        const onPromotion = promotionId
            ? await promotionService_1.promotionService.getPromotionWithId(promotionId)
            : await promotionService_1.promotionService.getAllPromotion();
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy sản phẩm khuyến mãi thành công', onPromotion));
    }),
    addPromotion: (0, express_async_handler_1.default)(async (req, res) => {
        const promotion = await promotionService_1.promotionService.createPromotions(req.body);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Thêm khuyến mãi thành công', promotion));
    }),
    getTimeSlots: (0, express_async_handler_1.default)(async (req, res) => {
        const timeSlots = await promotionService_1.promotionService.getAllTimeSlots();
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy khung giờ thành công', timeSlots));
    })
};
exports.default = promotionController;
