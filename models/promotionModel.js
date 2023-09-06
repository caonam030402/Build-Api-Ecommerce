"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionTimeSlots = exports.Promotion = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const promotionScheme = new mongoose_1.default.Schema({
    price: {
        type: Number
    },
    sold: {
        type: Number
    },
    quanlity: {
        type: Number
    },
    time_slot: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'PromotionTimeSlots'
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true });
const promotionTimeSlotSchema = new mongoose_1.default.Schema({
    time_start: {
        type: Date
    },
    time_end: {
        type: Date
    }
});
exports.Promotion = mongoose_1.default.model('Promotion', promotionScheme);
exports.PromotionTimeSlots = mongoose_1.default.model('PromotionTimeSlots', promotionTimeSlotSchema);
