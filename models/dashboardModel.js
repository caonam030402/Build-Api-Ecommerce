"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dashboardScheme = new mongoose_1.default.Schema({
    sellingTarget: {
        type: Number,
        default: 300
    }
}, { timestamps: true });
exports.Product = mongoose_1.default.model('Product', dashboardScheme);
