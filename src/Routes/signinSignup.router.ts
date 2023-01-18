
import { Router } from "express";
import {
    SignIn, signup,
    verifyUserEmail,
    verifyByOrganization,
    newCustomerApplication,
    allApprovedUser,
    adminData,
    userActivate_DeActivate_Controller,
    refreshTokenLogin,
} from "../Controllers/signinSignup.controller";
import { resultValidator } from "../Middleare/globalMiddleware";
import { customRedisRateLimiter } from "../Middleare/rateLimiter";
import { limitRequests } from "../Middleare/rateLimiterWithucketToken";
import { token_parser, requestAuthentication } from "../Utility/token";
import verifyRefreshToken from "../Utility/verifyRefreshToken";
import { signupValidator } from "../Validation/signinSignup.validator";

const SignInSignUpRoute = Router();

(() => {
    postRequest();
    patchRequest();
    getRequest();
})();




function postRequest() {
    SignInSignUpRoute.post("/signUp", signupValidator(), resultValidator, signup);
    SignInSignUpRoute.post("/signIn", SignIn)
    // SignInSignUpRoute.post("/signIn",limitRequests(5, 3), SignIn)
    SignInSignUpRoute.post("/signInrefresh", refreshTokenLogin)
    SignInSignUpRoute.post("/adminData", adminData)
}

function patchRequest() {
    SignInSignUpRoute.patch("/verifyAccount", verifyByOrganization)
    SignInSignUpRoute.patch("/updateStatus", requestAuthentication, userActivate_DeActivate_Controller)

}

function getRequest() {
    SignInSignUpRoute.get("/newUserApplication", requestAuthentication, newCustomerApplication);
    SignInSignUpRoute.get("/allApplication", requestAuthentication, allApprovedUser);
    SignInSignUpRoute.get("/verifyEmail", token_parser, verifyUserEmail)
}



export default SignInSignUpRoute;

