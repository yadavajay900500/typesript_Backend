import { NextFunction, Request, Response } from "express";
import userModel from '../Models/signinSigup.model'

const addToDoListAdd = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("++++++++++++++++",req.body)
        const { email, work} = req.body
        console.log(req.body.work)
        userModel.findOneAndUpdate(email,
            { "$push": { "toDaData": req.body.work} },
            { "new": true, "upsert": true },
            function (err, result) {
                if (err) throw err;
                console.log("))))))))))))))))))))",result);
                res.status(200).send("to do List add Successfully")
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
        console.log(req.body.toDoData)
        const { email, toDaData,index} = req.body
        console.log(req.body.toDoData)
        userModel.findOneAndUpdate(email,
            { "$pull": { "toDaData": req.body.toDoData} },
            { "new": true, "upsert": true },
            function (err, result) {
                if (err) throw err;
                console.log("))))))))))))))))))))",result);
                res.status(200).send("to do List add Successfully")
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
const addToDoListUpdate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, toDaData,index} = req.body
        console.log(req.body.toDoData)
       
        userModel.findOne({ email }, async (err: any, result: {
            toDaData: any; _id: any;
        }) => {
            if (err) {
                next(err)
            }
            if (result) {
                const toDoList = result.toDaData
                          if(index>-1){
                    toDoList.splice(index,1)
                }
                // toDoList.push(req.body.toDoData)
              
                console.log("Account is Successfully updated")
                res?.status(200).send({ msg: "You has been successfully upadted", data: result });
            }
        })
    } catch (err) {
        console.log(err)
    }

}

export { addToDoListAdd, addToDoListUpdate, addToDoListRemove }
