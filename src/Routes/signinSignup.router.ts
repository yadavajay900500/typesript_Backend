
import { Router } from "express";
import { signin, signup, 
    verifyUserEmail ,
    verifyByOrganization,
    newCustomerApplication,
    allApprovedUser,
    adminData,
    userActivateDeActivateController
} from "../Controllers/signinSignup.controller";
import { resultValidator } from "../Middleare/globalMiddleware";
import { token_parser,requestAuthentication } from "../Utility/token";
import { signupValidator } from "../Validation/signinSignup.validator";

const SignInSignUpRoute = Router();
(()=>{
    postRequest();
    patchRequest();
    getRequest();
})();

function postRequest(){
    SignInSignUpRoute.post("/signUp",signupValidator(),resultValidator,signup);
    SignInSignUpRoute.post("/signIn",signin)
    SignInSignUpRoute.post("/adminData",adminData)
}

function patchRequest(){
    SignInSignUpRoute.patch("/verifyAccount", verifyByOrganization)
    SignInSignUpRoute.patch("/updateStatus",requestAuthentication,userActivateDeActivateController)

}

function getRequest(){
    SignInSignUpRoute.get("/newUserApplication",newCustomerApplication);
    SignInSignUpRoute.get("/allApplication",requestAuthentication,allApprovedUser);
    SignInSignUpRoute.get("/verifyEmail",token_parser,verifyUserEmail)
}



export default SignInSignUpRoute;

