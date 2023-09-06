"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const errorHandlers_1 = require("../../middlewares/errorHandlers");
const productService_1 = __importDefault(require("../../services/productService"));
const utils_1 = __importDefault(require("../../utils/utils"));
const productController = {
    addProduct: (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const productBody = req.body;
            const imageUrls = req.files.map((file) => {
                const fileUrl = req.protocol + '://' + req.get('host') + '/v1/images/' + file.filename;
                return fileUrl;
            });
            productBody.images = Image;
            const objetProductBody = {
                ...productBody,
                image: imageUrls[0],
                rating: 0,
                view: 0,
                sold: 0
            };
            const product = await productService_1.default.createProduct(objetProductBody);
            res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', data: product });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Thêm thất bại' });
        }
    }),
    addProducts: (0, express_async_handler_1.default)(async (req, res) => {
        const bodyProducts = req.body;
        const products = await productService_1.default.createProduct(bodyProducts);
        res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', data: products });
    }),
    deleteProducts: (0, express_async_handler_1.default)(async (req, res) => {
        await productService_1.default.deleteProductById(req.params.id);
        res.status(201).json({ success: true, message: 'Xóa sản phẩm thành công' });
    }),
    getProductDetail: (0, express_async_handler_1.default)(async (req, res) => {
        const productDetail = await productService_1.default.getProductById(req.params.id);
        res.status(http_status_1.default.CREATED).json((0, utils_1.default)('Lấy sản phẩm thành công', productDetail));
    }),
    getProducts: (0, express_async_handler_1.default)(async (req, res) => {
        const paginate = await productService_1.default.paginateAndQueryProduct(req);
        res.status(http_status_1.default.OK).json((0, utils_1.default)('Lấy sản phẩm thành công thành công', {
            products: paginate.docs,
            pagination: { page: paginate.page, page_size: paginate.totalPages, limit: paginate.limit }
        }));
    }),
    getAProduct: (0, express_async_handler_1.default)(async (req, res) => {
        const findProduct = await productService_1.default.getProductById(req.params.id);
        if (!findProduct)
            throw new errorHandlers_1.ApiError('Không tìm thấy sản phẩm', http_status_1.default.UNPROCESSABLE_ENTITY, 'message');
    }),
    updateProduct: (0, express_async_handler_1.default)(async (req, res) => {
        const productBody = req.body;
        console.log(req.files);
        if (req.files) {
            const imageUrls = req.files.map((file) => {
                const fileUrl = req.protocol + '://' + req.get('host') + '/v1/images/' + file.filename;
                return fileUrl;
            });
            productBody.images = Image;
        }
        const objetProductBody = {
            ...productBody
        };
        const productUpdate = await productService_1.default.updateAProduct(req.body._id, objetProductBody);
        res.status(http_status_1.default.CREATED).json((0, utils_1.default)('Cập nhập sản phẩm thành công', productUpdate));
    })
};
exports.default = productController;
