"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
/**
 * @param {ObjectId} _id
 * @returns token
 */
const tokenService = {
    generateToken: (_id) => {
        return jsonwebtoken_1.default.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        });
    },
    generateRefreshToken: (_id) => {
        return jsonwebtoken_1.default.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        });
    },
    verifiToken: async (token, type) => {
        token = token.split(' ')[1];
        let decoded;
        if (type === 'access_token') {
            decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }
        else if (type === 'refresh_token') {
            decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        const user = await userModel_1.default.findById(decoded._id);
        if (!user) {
            throw new Error('Token not found');
        }
        return user;
    }
};
exports.default = tokenService;
