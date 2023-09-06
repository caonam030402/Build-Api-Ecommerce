"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const http_status_1 = __importDefault(require("http-status"));
class ApiError extends Error {
    constructor(message, statusCode, key) {
        super(message);
        this.statusCode = statusCode;
        this.key = key;
    }
}
exports.ApiError = ApiError;
const errorHandlers = {
    notFound: (req, res, next) => {
        const error = new Error(`Not Found : ${req.originalUrl}`);
        res.status(http_status_1.default.NOT_FOUND).json({
            statusCode: http_status_1.default.NOT_FOUND,
            message: `The requested resource '${req.originalUrl}' was not found.`
        });
        next(error);
    },
    errorHandler: async (err, req, res, next) => {
        const statusCode = err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
        if (statusCode === http_status_1.default.UNPROCESSABLE_ENTITY) {
            const data = {};
            if (err.key) {
                data[err.key] = err.message;
            }
            res.status(statusCode).json({
                statusCode,
                message: err?.message || 'Unprocessable Entity',
                data
            });
        }
        else {
            res.status(statusCode).json({
                statusCode,
                message: err?.message || 'Internal Server Error'
            });
        }
    }
};
exports.default = errorHandlers;
