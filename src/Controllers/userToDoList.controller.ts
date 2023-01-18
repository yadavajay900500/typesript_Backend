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
         userModel.findOneAndUpdate({email:email},
            { "$push": { "toDaData": req.body.work} },
            { "new": true, "upsert": true },
            function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
            }
        );
        // console.log("Account is Successfully updated")
        // res?.status(200).send({ msg: "You has been successfully upadted" });
        // userModel.findOne({ email }, async (err: any, result: {
        //     toDaData: any; _id: any;
        // }) => {
        //     if (err) {
        //         next(err)
        //     }
        //     if (result) {
        //         const toDoList = result.toDaData
        //         toDoList.push(req.body.toDoData)
        //         const addData=new userModel(result)
        //         addData.save((err)=>{
        //         if(!err){
        //             console.log("Account is Successfully updated")
        //             res?.status(200).send({ msg: "You has been successfully upadted", data: result });
        //         }
        //         if(err){
        //             console.log(err)
        //         }
        //         })
        //     }
        // })
    } catch (err) {
        console.log(err)
    }
}

const addToDoListRemove = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, toDaData,index} = req.body
        userModel.findOneAndUpdate({email:email},
            { "$pull": { "toDaData": req.body.toDaData} },
            function (err:any, result:any) {
                if (err) throw err;
               
                res.status(200).send(result)
            }
        );
        // userModel.findOne({ email }, async (err: any, result: {
        //     toDaData: any; _id: any;
        // }) => {
        //     if (err) {
        //         next(err)
        //     }
        //     if (result) {
        //         const toDoList = result.toDaData
        //         // toDoList.push(req.body.toDoData)
        //         if(index>-1){
        //             toDoList.splice(index,1)
        //         }
        //         const addData=new userModel(result)
        //         addData.save((err)=>{
        //         if(!err){
        //             console.log("Account is Successfully updated")
        //             res?.status(200).send({ msg: "You has been successfully upadted", data: result });
        //         }
        //         if(err){
        //             console.log(err)
        //         }
        //         })

        //     }
        // })
    } catch (err) {
        console.log(err)
    }


}
const addToDoListUpdate = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, toDaData,index} = req.body
        // console.log("inside update",req.body)
       
        const result = await userModel.find({ email:req.body.email}) 
        console.log("id result",result[0]._id)
        console.log(result[0].toDaData)
       
             if (result) {
                 
              const resu =   result[0].toDaData.indexOf(index)
              result[0].toDaData.splice(resu,1,toDaData)
             
                }
                // console.log("btao",result[0].toDaData)
               
            const finalResult = await userModel.findByIdAndUpdate(result[0]._id,{toDaData:result[0].toDaData},{new:true})
                 console.log("finalResult")
                res.status(200).send(finalResult);
        }
    
     catch (err) {
        res.send({msg:"no data to update"})
    }

}

export { addToDoListAdd, addToDoListUpdate, addToDoListRemove,getAlltasks }
