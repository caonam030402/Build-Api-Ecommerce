"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storageUpload_1 = require("../configs/storageUpload");
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.get('/me', authMiddleware_1.default.verifyToken, userController_1.default.getUser);
router.put('/user', authMiddleware_1.default.verifyToken, userController_1.default.updateUser);
router.post('/user/upload-avatar', storageUpload_1.upload.any(), userController_1.default.uploadAvatar);
router.get('/images/:filename', userController_1.default.getAvatar);
router.get('/address', userController_1.default.getAddress);
exports.default = router;
