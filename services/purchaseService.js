"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const errorHandlers_1 = require("../middlewares/errorHandlers");
const productModel_1 = require("../models/productModel");
const purchaseModel_1 = require("../models/purchaseModel");
const promotionModel_1 = require("../models/promotionModel");
const purchaseService = {
    /**
     * Add to card
     * @param {string} product_id
     * @param {number} buy_count
     * @returns <Purchases>
     */
    addToCart: async ({ product_id, buy_count }, user) => {
        const product = (await productModel_1.Product.findById(product_id));
        const purchase = await purchaseModel_1.Purchase.findOne({ user: user?._id, product: product._id, status: -1 });
        const purchaseArray = [];
        if (purchase) {
            purchase.buy_count += buy_count;
            const purchaseSave = await purchase.save();
            purchaseArray.push(purchaseSave);
        }
        else {
            const newPurchase = await purchaseModel_1.Purchase.create({
                buy_count: buy_count,
                price: product.price,
                price_before_discount: product.price_before_discount,
                status: -1,
                user: user?._id,
                product: product
            });
            purchaseArray.push(newPurchase);
        }
        return purchaseArray[0];
    },
    /**
     * Add to card
     * @param {string} user_id
     * @param {number} status
     * @returns Purchases
     */
    getPurchasesWithStatus: async (status, user_id) => {
        const purchase = status === 0
            ? purchaseModel_1.Purchase.find({ user: user_id }).populate('product').populate('user').sort({ updatedAt: -1 })
            : purchaseModel_1.Purchase.aggregate([
                user_id ? { $match: { status: status, user: user_id } } : { $match: { status: status } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                { $unwind: '$productDetails' },
                {
                    $addFields: {
                        product: '$productDetails'
                    }
                },
                {
                    $project: {
                        productDetails: 0
                    }
                },
                status !== -1 ? { $sort: { updatedAt: -1 } } : { $sort: { createdAt: -1 } }
            ]);
        return purchase;
    },
    /**
     * Buy Product
     * @param {string} purchase_ids
     * @returns Purchases
     */
    buyProduct: async (purchase_ids) => {
        await purchaseModel_1.Purchase.updateMany({ _id: { $in: purchase_ids } }, { $set: { status: 1 } }, { returnOriginal: false });
        const purchases = await purchaseModel_1.Purchase.find({ _id: { $in: purchase_ids } }).populate('product');
        if (!purchases) {
            throw new errorHandlers_1.ApiError('Không tìm thấy sản phẩm', http_status_1.default.INTERNAL_SERVER_ERROR, 'message');
        }
        const productIds = purchases.map((product) => product._id);
        const buy_counts = purchases.map((product) => product.buy_count);
        const promotionsToUpdate = await promotionModel_1.Promotion.find({ product: { $in: productIds } });
        console.log(promotionsToUpdate);
        if (promotionsToUpdate) {
            promotionsToUpdate.forEach((promotion, index) => {
                const newSoldCount = promotion.sold + buy_counts[index];
                const newQuantity = promotion.quanlity - buy_counts[index];
                promotion.sold = newSoldCount;
                promotion.quanlity = newQuantity;
            });
            // Perform bulk update for promotions
            await promotionModel_1.Promotion.bulkWrite(promotionsToUpdate.map((promotion) => ({
                updateOne: {
                    filter: { _id: promotion._id },
                    update: { $set: { sold: promotion.sold, quanlity: promotion.quanlity } }
                }
            })));
        }
        // Perform bulk update for promotions
        await promotionModel_1.Promotion.bulkWrite(promotionsToUpdate.map((promotion) => ({
            updateOne: {
                filter: { _id: promotion._id },
                update: { $set: { sold: promotion.sold, quanlity: promotion.quanlity } }
            }
        })));
        return purchases;
    },
    /**
     * Update purchase
     * @param {string} product_id
     * @param {IPurchase} bodyUpdate
     * @returns Purchase
     */
    updatePurchase: async (product_id, bodyUpdate, purchase_id) => {
        let query = {};
        if (product_id) {
            query = { product: product_id };
        }
        else if (purchase_id) {
            query = { _id: purchase_id };
        }
        const purchase = await purchaseModel_1.Purchase.updateMany(query, bodyUpdate);
        return purchase;
    }
};
exports.default = purchaseService;
