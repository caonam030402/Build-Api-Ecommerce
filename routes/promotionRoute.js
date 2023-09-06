"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promotionController_1 = __importDefault(require("../controllers/promotionController"));
const router = express_1.default.Router();
router.post('/add-promotion', promotionController_1.default.addPromotion);
router.get('/', promotionController_1.default.getPromotions);
router.get('/time-slots', promotionController_1.default.getTimeSlots);
exports.default = router;
