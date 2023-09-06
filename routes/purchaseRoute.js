"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseController_1 = __importDefault(require("../controllers/purchaseController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/add-to-cart', authMiddleware_1.default.verifyToken, purchaseController_1.default.addToCart);
router.post('/buy-products', authMiddleware_1.default.verifyToken, purchaseController_1.default.buyProduct);
router.put('/update-purchase', purchaseController_1.default.updatePurchase);
router.get('/', authMiddleware_1.default.verifyToken, purchaseController_1.default.getUserPurchase);
router.get('/:status', purchaseController_1.default.getPurchasesWithParam);
router.delete('/', authMiddleware_1.default.verifyToken, purchaseController_1.default.deletePurchase);
exports.default = router;
