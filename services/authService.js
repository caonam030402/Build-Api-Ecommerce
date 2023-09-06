"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("./userService"));
const errorHandlers_1 = require("../middlewares/errorHandlers");
const http_status_1 = __importDefault(require("http-status"));
const authService = {
    /**
     * Login with username and password
     * @param {string} email
     * @param {string} password
     * @returns User
     */
    loginWithEmail: async ({ email, password }) => {
        const user = await userService_1.default.getUserByEmail(email);
        if (await (await user).isPasswordMatch(password)) {
            return user;
        }
        else {
            throw new errorHandlers_1.ApiError('Password không chính xác', http_status_1.default.UNPROCESSABLE_ENTITY, 'password');
        }
    }
};
exports.default = authService;
