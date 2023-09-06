"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
const router = express_1.default.Router();
router.get('/quanlity-overview', dashboardController_1.default.quanlityOverview);
router.get('/quantity-sold-overtime', dashboardController_1.default.quantitySoldOverTime);
router.get('/notification', dashboardController_1.default.notificationOder);
exports.default = router;
