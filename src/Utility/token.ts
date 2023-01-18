// import { NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Console } from "console";



const secret: string = "All_is_Well"
const generateToken = (data: any, expiresIn = "1d",) => {
  console.log(">>>>>>>>>>>>", expiresIn)
  return jwt.sign({ data }, `All_is_Well`, { expiresIn });
};

const refreshToken = (data: any, expiresIn = "1d") => {
  return jwt.sign({ data }, secret, { expiresIn })
}

const token_parser = async (req: Request, res: Response, next: NextFunction) => {
  console.log("@@@@@@@@@@@@@@@@@", req.query)
  const token: string = req.query.token as string

  try {
    const decoded = await Promise.resolve(jwt.verify(token, secret));
    // console.log("decoded========>", decoded)
    req.body.token = decoded;
    next();
  } catch (error) {
    next(error);
  }
}


const requestAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(")))))))+++++++++++++++++++=========", req.headers)
  console.log(")))))))+++++++++++++++++++=========", req.body)
  const token: string = req.headers.token as string
  try {
    const decoded:any = jwt.verify(token, secret,(err,decoded)=>{
      let dateNow = new Date();
			let expireTokenTime = decoded?.exp;
			let initialTime = decoded?.iat;
      console.log("mmmmmmmmmmmm",initialTime,dateNow.getTime() / 1000)
			console.log(">>>>>>>>>",expireTokenTime,dateNow.getTime() / 1000)
			let timeExpire = expireTokenTime - 100 > dateNow.getTime() / 1000
			console.log("==========,",timeExpire)
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ success: false, message: 'Unauthorized! Access Token was expired!' });
      }
      if(decoded){
        console.log("============",decoded)
        next()
      }
    });
   
    

    
    // next();
  } catch (error) {
    next(error);
  }
}
export { generateToken, token_parser, requestAuthentication, refreshToken }