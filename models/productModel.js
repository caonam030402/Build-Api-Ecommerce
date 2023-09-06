"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryProduct = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const productScheme = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    images: {
        type: [String]
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String
    },
    rating: {
        type: Number
    },
    sold: {
        type: Number
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    price_before_discount: {
        type: Number
    },
    view: {
        type: Number
    },
    promotion: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Promotion'
    }
}, { timestamps: true });
productScheme.plugin(mongoose_paginate_v2_1.default);
const categoryProductScheme = new mongoose_1.default.Schema({
    name: {
        type: String
    }
}, { timestamps: true });
exports.Product = mongoose_1.default.model('Product', productScheme);
exports.CategoryProduct = mongoose_1.default.model('Category', categoryProductScheme);
