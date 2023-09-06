"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("../routes/authRoute"));
const userRoute_1 = __importDefault(require("../routes/userRoute"));
const productRoute_1 = __importDefault(require("../routes/product/productRoute"));
const categoryRoute_1 = __importDefault(require("../routes/product/categoryRoute"));
const purchaseRoute_1 = __importDefault(require("../routes/purchaseRoute"));
const dashboardRoute_1 = __importDefault(require("../routes/dashboardRoute"));
const vnpPaymentRoute_1 = __importDefault(require("../routes/vnpPaymentRoute"));
const promotionRoute_1 = __importDefault(require("../routes/promotionRoute"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: '/',
        route: authRoute_1.default
    },
    {
        path: '/',
        route: userRoute_1.default
    },
    {
        path: '/products',
        route: productRoute_1.default
    },
    {
        path: '/categories',
        route: categoryRoute_1.default
    },
    {
        path: '/purchases',
        route: purchaseRoute_1.default
    },
    { path: '/dashboard', route: dashboardRoute_1.default },
    { path: '/payment', route: vnpPaymentRoute_1.default },
    { path: '/promotions', route: promotionRoute_1.default }
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
