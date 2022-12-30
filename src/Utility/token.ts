import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";



const secret:string = process.env.secret_key as string
const generateToken = (data: any, expiresIn = "1d",) => {
    return jwt.sign({ data }, secret, { expiresIn });
  };

  const refreshToken=(data:any,expiresIn="1d")=>{
return jwt.sign({data},secret,{expiresIn})
  }

  const token_parser = async(req:Request, res:Response, next:NextFunction) => {

    const token:string = req.query.token as string
  
  try {
    const decoded = await Promise.resolve(jwt.verify(token, secret));
    
     req.body.token = decoded;
     next();
  } catch (error) {
    next(error);
  }
}

const requestAuthentication=async (req:Request,res:Response,next:NextFunction)=>{
  
    const token:string = req.headers.token as string 
  
  try {
    const decoded = await Promise.resolve(jwt.verify(token, secret));
    req.body.userInfo = decoded;
     next();
  } catch (error) {
    next(error);
  }
}
  export  {generateToken,token_parser,requestAuthentication,refreshToken}