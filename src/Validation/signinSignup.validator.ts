import { Request, Response, NextFunction } from "express";
import { body, check } from "express-validator";
import userModel from "../Models/signinSigup.model";

const signupValidator =  () => {
  console.log("MMMMMMMMMMMMMMM")
    return [
      check('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
      check('phone').isLength({max:10}).withMessage('Invalid mobile Number'),
      check('email').isEmail().withMessage("email is invalid in "),
    ]
  }



const signinValidator = () => {
  console.log("validation file")
  return [
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),
    check('email').custom(async (email, { req }) => {
      const user = req.body
      const result = await userModel.findOne({ email });
      if (!result) {
        throw new Error("user not exist")
      } else {
        req.body.userInfo = result;
      }
      return true

    }),
  ]
}

export { signupValidator, signinValidator }