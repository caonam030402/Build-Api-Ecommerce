"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    new_password: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    address: {
        type: String
    },
    roles: {
        type: [String]
    },
    avatar: {
        type: String
    }
}, { timestamps: true });
/**
 * Check if email taken
 * @param {string} email
 * @param {ObjectId} excludeUserId
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};
/**
 * Check Password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
/**
 * Hash Password
 */
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt_1.default.hash(this.password, 10);
    }
    next();
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
