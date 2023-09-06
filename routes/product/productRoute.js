"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../../controllers/product/productController"));
const storageUpload_1 = require("../../configs/storageUpload");
const router = express_1.default.Router();
router.post('/add-product', storageUpload_1.upload.any(), productController_1.default.addProduct);
router.post('/add-products', productController_1.default.addProducts);
router.put('/update-product', storageUpload_1.upload.any(), productController_1.default.updateProduct);
router.get('/:id', productController_1.default.getProductDetail);
router.get('/:id', productController_1.default.getAProduct);
router.get('/', productController_1.default.getProducts);
router.delete('/delete-product/:id', productController_1.default.deleteProducts);
exports.default = router;
