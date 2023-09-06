"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const dbConnect_1 = __importDefault(require("./configs/dbConnect"));
const errorHandlers_1 = __importDefault(require("./middlewares/errorHandlers"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3002',
        methods: ['GET', 'POST']
    }
});
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
(0, dbConnect_1.default)();
// Config
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use('/v1/images', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('common'));
app.use((0, cookie_parser_1.default)());
// Route
app.use('/v1', routes_1.default);
// Error Response
app.use(errorHandlers_1.default.errorHandler);
app.use(errorHandlers_1.default.notFound);
