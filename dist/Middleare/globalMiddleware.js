"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultValidator = void 0;
const express_validator_1 = require("express-validator");
const resultValidator = (req, res, next) => {
    var _a;
    const result = (0, express_validator_1.validationResult)(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
        const errorList = (_a = result.array()) === null || _a === void 0 ? void 0 : _a.map((obj) => {
            console.log("Error in validation", `${obj.msg}`);
            return `Eorror in Validation----> ${obj.msg} `;
        });
        // res.status:(Number) = 400;
        res.status(401).send({ validatorError: errorList });
        next(errorList);
    }
    else {
        next();
    }
};
exports.resultValidator = resultValidator;
