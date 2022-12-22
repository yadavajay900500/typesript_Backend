"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToDoListRemove = exports.addToDoListUpdate = exports.addToDoListAdd = void 0;
const signinSigup_model_1 = __importDefault(require("../Models/signinSigup.model"));
const addToDoListAdd = (req, res, next) => {
    try {
        const { email } = req.body;
        signinSigup_model_1.default.findOne({ email }, async (err, result) => {
            if (err) {
                next(err);
            }
            if (result) {
                console.log(".>>>>>>", result);
                const { _id } = result;
                console.log("Account is Successfully updated");
                res === null || res === void 0 ? void 0 : res.status(200).send({ msg: "You has been successfully upadted", data: result });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.addToDoListAdd = addToDoListAdd;
const addToDoListRemove = () => {
};
exports.addToDoListRemove = addToDoListRemove;
const addToDoListUpdate = () => {
};
exports.addToDoListUpdate = addToDoListUpdate;
