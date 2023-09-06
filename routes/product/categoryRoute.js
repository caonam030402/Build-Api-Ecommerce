"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../../controllers/product/categoryController"));
const router = express_1.default.Router();
router.post('/add-category', categoryController_1.default.addCategory);
router.get('/', categoryController_1.default.getCaregory);
exports.default = router;
