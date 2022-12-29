import { NextFunction, Request, Response } from "express";
import { Result } from "express-validator";
import userModel from '../Models/signinSigup.model';



const getAlltasks = async(req: Request, res: Response, next: NextFunction) =>{
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




const addToDoListAdd = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
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
           
       
    } catch (err) {
        console.log(err)
    }
}

const addToDoListRemove = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { email, toDaData,index} = req.body
       const result = await userModel.findOneAndUpdate({email:email},
            { "$pull": { "toDaData": req.body.toDaData} });

        if(result){
            res.status(200).send({msg:"task deleted successfully"})
        }
        else{
            res.status(500).send({msg:"something went wrong"})
        }
           
     
    } catch (err) {
        console.log(err)
    }


}
const addToDoListUpdate = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, toDaData,index} = req.body
      
       
        const result = await userModel.find({ email:req.body.email}) 
       
             if (result) {
                 
              const resu =   result[0].toDaData.indexOf(index)
              result[0].toDaData.splice(resu,1,toDaData)
             
                }
            
               
            const finalResult = await userModel.findByIdAndUpdate(result[0]._id,{toDaData:result[0].toDaData},{new:true})
               
                res.status(200).send(finalResult);
        }
    
     catch (err) {
        res.send({msg:"no data to update"})
    }

}

export { addToDoListAdd, addToDoListUpdate, addToDoListRemove,getAlltasks }
