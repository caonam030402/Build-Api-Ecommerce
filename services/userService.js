"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const http_status_1 = __importDefault(require("http-status"));
const errorHandlers_1 = require("../middlewares/errorHandlers");
const addressModel_1 = require("../models/addressModel");
const userService = {
    /**
     * Create a user with email and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<User>}
     */
    createUser: async ({ email, password }) => {
        if (await userModel_1.default.isEmailTaken(email)) {
            throw new errorHandlers_1.ApiError('Email đã được sử dụng', http_status_1.default.UNPROCESSABLE_ENTITY, 'email');
        }
        return userModel_1.default.create({ email, password });
    },
    /**
     * Get User By Email
     * @param {string} email
     * @returns User
     */
    getUserByEmail: async (email) => {
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            throw new errorHandlers_1.ApiError('Email không tồn tại', http_status_1.default.UNPROCESSABLE_ENTITY, 'email');
        }
        return user;
    },
    /**
     * Get User By Email
     * @param {string} _id
     * @param {IUser} bodyUpdate
     * @returns User
     */
    updateUserById: async (_id, bodyUpdate) => {
        const user = await userModel_1.default.findOne({ _id });
        if (!user) {
            throw Error('Người dùng không tồn tại');
        }
        Object.assign(user, bodyUpdate);
        await user.save();
        return user;
    },
    getAllAddress: async () => {
        const address = await addressModel_1.Address.find();
        return address;
    }
};
exports.default = userService;
