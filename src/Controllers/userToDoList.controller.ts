import { NextFunction, Request, Response } from "express";

import userModel from '../Models/signinSigup.model';



const getAllTasks = async(req: Request, res: Response, next: NextFunction) =>{
    
         const email = req.query.email
         const result = await userModel.find({email:email})
         if(result){
            
            res.status(200).send(result[0].toDaData)
         }
         else{
            res.status(404).send({err:"data not found"})
         }

     }
    
        
    





const addToDoListAdd = async(req: Request, res: Response, next: NextFunction) => {

        
        const { email, work} = req.body
        
      const result = await userModel.findOneAndUpdate({email:email},
                                                      { "$push": { "toDaData": req.body.work} },
                                                      { "new": true, "upsert": true });

        if(result){
            res.status(200).send({msg:"new task added"})
        }
        else{
            res.status(500).send({msg:"something went wrong"})
        }
} 
       
    

const addToDoListRemove = async(req: Request, res: Response, next: NextFunction) => {
  
        
        const { email} = req.body
       const result = await userModel.findOneAndUpdate({email:email},
            { "$pull": { "toDaData": req.body.toDaData} });

        if(result){
            res.status(200).send({msg:"task deleted successfully"})
        }
        else{
            res.status(500).send({msg:"something went wrong"})
        }
    }


const addToDoListUpdate = async(req: Request, res: Response, next: NextFunction) => {
    
        const {toDaData,index} = req.body
      
       
        const result = await userModel.find({ email:req.body.email}) 
       
            if (result) {
                 
              const resu =   result[0].toDaData.indexOf(index)
              result[0].toDaData.splice(resu,1,toDaData)
              const finalResult = await userModel.findByIdAndUpdate(result[0]._id,{toDaData:result[0].toDaData},{new:true})
              if(finalResult){
                res.status(201).send(finalResult)
              }
              else{
                res.status(500).send({err:"something went wrong "})
              }
            }
            else{
                res.status(404).send({err:"no data found"})
            }
            
}
    
    



export { addToDoListAdd, addToDoListUpdate, addToDoListRemove,getAllTasks }
