"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "All_is_Well";
const generateToken = (data, expiresIn = "1d") => {
    console.log(">>>>>>>>>>>>", expiresIn);
    return jsonwebtoken_1.default.sign({ data }, `All_is_Well`, { expiresIn });
};
exports.generateToken = generateToken;
const token_parser = async (req, res, next) => {
    // const {token} = req.query;
    const token = "";
    try {
        const decoded = await Promise.resolve(jsonwebtoken_1.default.verify(token, secret));
        //  req.body.token = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
