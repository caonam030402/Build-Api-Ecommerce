"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseSchema = new mongoose_1.default.Schema({
    buy_count: {
        type: Number
    },
    price: {
        type: Number
    },
    price_before_discount: {
        type: Number
    },
    status: {
        type: Number,
        enum: [0, -1, 1, 2, 3, 4, 5]
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true });
exports.Purchase = mongoose_1.default.model('Purchase', purchaseSchema);
