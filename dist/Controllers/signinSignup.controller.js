"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAccountByAdmin = exports.verifyUserEmail = exports.signup = exports.SignIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const signinSigup_model_1 = __importDefault(require("../Models/signinSigup.model"));
const token_1 = require("../Utility/token");
// import { sendMailTo } from "../Utility/nodeMailer.utilty";
const saltRounds = 2;
const signup = async (req, res) => {
    try {
        console.log("++++++++++++++++++++++++", req.body);
        const { email, password } = req.body;
        const hass = await bcrypt_1.default.hash(password, saltRounds);
        const TOKEN = (0, token_1.generateToken)(email, `${60 * 1}s`);
        console.log(TOKEN);
        const emailLink = `http://localhost:5050/verify-account?token=${TOKEN}`;
        // const emailStatus = await sendMailTo(
        //     ["rajendrayadav900500@gmail.com"],
        //     emailLink
        // );
        const user = new signinSigup_model_1.default({
            fullname: req.body.fullname,
            email: email,
            password: hass,
            token: TOKEN
        });
        console.log("QQQQQQQQQQ", user);
        user.save(async (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err });
                return;
            }
            ;
            res.status(200).send({ msg: user });
        });
    }
    catch (err) {
        console.log("Someting Wrong", err);
        res.status(403).json("Signup Failed!");
    }
    // res.status(200).json("Successfull Signup");
};
exports.signup = signup;
const verifyUserEmail = (req, res, next) => {
    try {
        const { email } = req.body;
        signinSigup_model_1.default.findOne({ email: email }, { new: true }, async (err, result) => {
            if (err) {
                next(err);
            }
            else if (result) {
                const updatedta = await signinSigup_model_1.default.updateOne({ email }, { emailVerified: true }, { new: true });
                res.json({ status: "Account Verified", msg: updatedta });
            }
            else {
                res.send({ status: "Invalid Url" });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).send("Something Wrong !");
    }
};
exports.verifyUserEmail = verifyUserEmail;
const verifyUserAccountByAdmin = (req, res) => {
};
exports.verifyUserAccountByAdmin = verifyUserAccountByAdmin;
;
const SignIn = (req, res) => {
    try {
        console.log("+++++++++++", req.body);
        const { email, password } = req.body;
        const userData = signinSigup_model_1.default.findOne({ email: email }, async (err, result) => {
            if (result) {
                const match_pass = await bcrypt_1.default.compare(req.body.password, result.password);
                if (match_pass) {
                    const TOKEN = (0, token_1.generateToken)(email, `${60 * 1}s`);
                    res.status(200).send({ msg: "User logIn Successfull", userData: TOKEN });
                }
                else {
                    res.status(401).send("Wrong Password");
                }
            }
            if (err) {
                console.log(err);
                res.status(403).send("Data not Found");
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(403).send("Something Wrong");
    }
};
exports.SignIn = SignIn;
