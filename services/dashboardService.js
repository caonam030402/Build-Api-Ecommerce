"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../models/productModel");
const purchaseModel_1 = require("../models/purchaseModel");
const userModel_1 = __importDefault(require("../models/userModel"));
const dashboardService = {
    totalProduct: async () => {
        const totalProduct = await productModel_1.Product.aggregate([{ $group: { _id: null, total: { $sum: '$sold' } } }]);
        return totalProduct;
    },
    totalAmoutSold: async () => {
        const totalAmoutSold = await purchaseModel_1.Purchase.aggregate([
            { $match: { status: 4 } },
            { $project: { total: { $multiply: [{ $sum: '$buy_count' }, { $sum: '$price' }] } } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        return totalAmoutSold;
    },
    totalProductSold: async () => {
        const totalProductSold = await purchaseModel_1.Purchase.aggregate([
            { $match: { status: 4 } },
            { $group: { _id: null, total: { $sum: '$buy_count' } } }
        ]);
        return totalProductSold;
    },
    totalUser: async () => {
        const totalUser = await userModel_1.default.aggregate([{ $group: { _id: null, total: { $sum: 1 } } }]);
        return totalUser;
    },
    quantitySoldOverTime: async () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const purchase = await purchaseModel_1.Purchase.aggregate([
            {
                $match: {
                    updatedAt: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            { $match: { status: 4 } },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$buy_count' }
                }
            },
            {
                $addFields: {
                    currentDateTime: new Date()
                }
            }
        ]);
        return purchase[0];
    },
    notificationOder: () => {
        const purchase = purchaseModel_1.Purchase.aggregate([{ $match: { status: 1 } }]);
        return purchase;
    }
};
exports.default = dashboardService;
