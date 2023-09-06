"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndUpdateTimeSlots = void 0;
const moment_1 = __importDefault(require("moment"));
const promotionModel_1 = require("../models/promotionModel");
const node_cron_1 = __importDefault(require("node-cron"));
const createAndUpdateTimeSlots = async () => {
    const bulkOperations = [];
    // Xóa khung giờ trong quá khứ
    const deletePastTimeSlots = {
        deleteMany: {
            filter: {
                time_end: { $lt: new Date(String((0, moment_1.default)().startOf('hour'))) }
            }
        }
    };
    bulkOperations.push(deletePastTimeSlots);
    await promotionModel_1.PromotionTimeSlots.bulkWrite(bulkOperations);
    // Tạo 5 khung giờ
    const findTimeSlots = await promotionModel_1.PromotionTimeSlots.find({}, 'time_end');
    const limit = 6;
    const currentLength = findTimeSlots.length;
    const startAndEndTimeGap = 3;
    let currentTime = currentLength === 0
        ? (0, moment_1.default)().startOf('hour')
        : (0, moment_1.default)(findTimeSlots[currentLength - 1].time_end).startOf('hour');
    const numSlotsToAdd = currentLength < limit ? (currentLength === 0 ? limit : limit - currentLength) : 0;
    for (let i = 0; i < numSlotsToAdd; i++) {
        const timeStart = currentTime;
        const timeEnd = (0, moment_1.default)(currentTime).add(startAndEndTimeGap, 'hours');
        bulkOperations.push({
            insertOne: {
                document: {
                    time_start: timeStart.format(),
                    time_end: timeEnd.format()
                }
            }
        });
        currentTime = (0, moment_1.default)(currentTime).add(startAndEndTimeGap, 'hour');
    }
    await promotionModel_1.PromotionTimeSlots.bulkWrite(bulkOperations);
};
exports.createAndUpdateTimeSlots = createAndUpdateTimeSlots;
node_cron_1.default.schedule('*/5 * * * *', exports.createAndUpdateTimeSlots);
