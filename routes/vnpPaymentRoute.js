"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vnpPaymentController_1 = require("../controllers/vnpPaymentController");
const router = express_1.default.Router();
router.post('/create_payment_url', vnpPaymentController_1.vnpPaymentController.createPaymentUrl);
router.get('/return_payment', vnpPaymentController_1.vnpPaymentController.vnpReturn);
exports.default = router;
