import { NextFunction, Request, Response } from "express";
import { Result } from "express-validator";
import userModel from '../Models/signinSigup.model';

module.exports.getAlltasks = async(req: Request, res: Response, next: NextFunction) =>{
    try{
         const email = req.query.email
         const result = await userModel.find({email:email})
         if(result){
            res.status(200).send(result[0].toDaData)
         }
     }
    catch(err){
        res.status(404).send(err)
    }
}