"use strict";
// const { Sig } from ('../Controllers/signinSignup.controller');
// const { resultValidator } = require('../Middleware/globalMiddleare');
// const { signUpValidator } = require('../Validation/signInSignUp.validator');
Object.defineProperty(exports, "__esModule", { value: true });
// const {Router} from ('express').Router();
const express_1 = require("express");
const signinSignup_controller_1 = require("../Controllers/signinSignup.controller");
const globalMiddleware_1 = require("../Middleare/globalMiddleware");
const signinSignup_validator_1 = require("../Validation/signinSignup.validator");
const SignInSignUpRoute = (0, express_1.Router)();
(() => {
    postRequest();
})();
function postRequest() {
    SignInSignUpRoute.post("/signUp", (0, signinSignup_validator_1.signupValidator)(), globalMiddleware_1.resultValidator, signinSignup_controller_1.signup);
    SignInSignUpRoute.post("/signIn", signinSignup_controller_1.SignIn);
    SignInSignUpRoute.post("/verifyEmail", signinSignup_controller_1.verifyUserEmail);
}
exports.default = SignInSignUpRoute;
