"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vnpPaymentController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moment_1 = __importDefault(require("moment"));
const qs_1 = __importDefault(require("qs"));
const crypto_1 = __importDefault(require("crypto"));
const vnpPaymentService_1 = require("../services/vnpPaymentService");
const http_status_1 = __importDefault(require("http-status"));
const utils_1 = __importDefault(require("../utils/utils"));
const vnp_TmnCode = process.env.vnp_TmnCode;
const vnp_HashSecret = process.env.VNP_HASHSECRET;
const vnp_Url = process.env.vnp_Url;
const vnp_ReturnUrl = process.env.vnp_ReturnUrl;
exports.vnpPaymentController = {
    createPaymentUrl: (0, express_async_handler_1.default)(async (req, res, next) => {
        console.log(process.env.VNP_HASHSECRET);
        const date = new Date();
        const createDate = (0, moment_1.default)(date).format('YYYYMMDDHHmmss');
        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.socket.remoteAddress;
        const tmnCode = vnp_TmnCode;
        const secretKey = vnp_HashSecret;
        let vnpUrl = vnp_Url;
        const returnUrl = vnp_ReturnUrl;
        const orderId = (0, moment_1.default)(date).format('DDHHmmss');
        const amount = req.body.amount;
        const bankCode = req.body.bankCode;
        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        const currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        if (tmnCode && returnUrl) {
            vnp_Params['vnp_TmnCode'] = tmnCode;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
        }
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_IpAddr'] = String(ipAddr);
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        vnp_Params = vnpPaymentService_1.vnpPaymentService.sortObject(vnp_Params);
        const signData = qs_1.default.stringify(vnp_Params, { encode: false });
        if (!secretKey) {
            throw new Error('Secret key is undefined');
        }
        const hmac = crypto_1.default.createHmac('sha512', secretKey);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + qs_1.default.stringify(vnp_Params, { encode: false });
        vnpUrl && res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy URL thành công', vnpUrl));
    }),
    vnpReturn: (0, express_async_handler_1.default)(async (req, res) => {
        let vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        vnp_Params = vnpPaymentService_1.vnpPaymentService.sortObject(vnp_Params);
        const tmnCode = vnp_TmnCode;
        const secretKey = vnp_HashSecret;
        const signData = qs_1.default.stringify(vnp_Params, { encode: false });
        const hmac = crypto_1.default.createHmac('sha512', secretKey);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        if (secureHash === signed) {
            res.json((0, utils_1.default)('Thanh toán thành công', vnp_Params['vnp_ResponseCode']));
        }
        else {
            res.json((0, utils_1.default)('Thanh toán thành công', '88'));
        }
    })
};
