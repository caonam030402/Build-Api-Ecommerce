"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const addressSchema = new mongoose_1.default.Schema({
    Id: {
        type: String
    },
    Name: {
        type: String
    },
    Districts: [
        {
            Id: {
                type: String
            },
            Name: {
                type: String
            },
            ward: [
                {
                    Id: {
                        Type: String
                    },
                    Name: {
                        type: String
                    }
                }
            ]
        }
    ]
});
exports.Address = mongoose_1.default.model('address', addressSchema);
