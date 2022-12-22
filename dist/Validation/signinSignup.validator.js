"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
const signinSigup_model_1 = __importDefault(require("../Models/signinSigup.model"));
const signupValidator = () => {
    console.log("MMMMMMMMMMMMMMM");
    return [
        (0, express_validator_1.check)('password')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('must contain a number'),
        (0, express_validator_1.check)('phone').isLength({ max: 10 }).withMessage('Invalid mobile Number'),
        (0, express_validator_1.check)('email').isEmail().withMessage("email is invalid in "),
    ];
};
exports.signupValidator = signupValidator;
const signinValidator = () => {
    console.log("validation file");
    return [
        (0, express_validator_1.check)('password')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('must contain a number'),
        (0, express_validator_1.check)('email').custom(async (email, { req }) => {
            const user = req.body;
            const result = await signinSigup_model_1.default.findOne({ email });
            if (!result) {
                throw new Error("user not exist");
            }
            else {
                req.body.userInfo = result;
            }
            return true;
        }),
    ];
};
exports.signinValidator = signinValidator;
