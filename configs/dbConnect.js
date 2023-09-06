"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createAndUpdateTimeSlots_1 = require("./createAndUpdateTimeSlots");
const dbConnect = async () => {
    try {
        const env = process.env.URL_MONGOOSE;
        await mongoose_1.default.connect(env);
        console.log('DB connected!!!');
        (0, createAndUpdateTimeSlots_1.createAndUpdateTimeSlots)();
    }
    catch (error) {
        console.log('DB not connect!!!');
    }
};
exports.default = dbConnect;
