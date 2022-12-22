"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const User = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerified: {
        default: false
    },
    verifiedByAdmin: {
        default: false
    },
    token: {
        type: String,
        required: true,
    },
    toDaData: {
        type: Array
    }
});
const userModel = mongoose_1.default.model("doceree", User);
exports.default = userModel;
