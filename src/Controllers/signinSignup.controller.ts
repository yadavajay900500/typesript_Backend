import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from '../Models/signinSigup.model';
import { generateToken, refreshToken } from '../Utility/token';
import { sendMailTo, sendMailwhenPending, sendMailWhenRejected } from "../Utility/nodeMailer.utilty";
const saltRounds: number = 2;

const signup = async (req: Request, res: Response) => {
  
      
    const { email, password } = req.body
    const hass = await bcrypt.hash(password, saltRounds);
    const TOKEN: string = generateToken(email, `${60 * 15}s`)


    const emailLink = `http://localhost:5050/verifyEmail?token=${TOKEN}`;
   
    const user = new userModel({
      name: req.body.name,
      email: email,
      password: hass,
      token: TOKEN,
      market: req.body.market,
      role: req.body.role
    });

    const data = await user.save()
    if (!data) {
      res.status(500).send({ message: "some error occured" });
    }
    else {
      const emailStatus = await sendMailTo(
        ["rajendrayadav900500@gmail.com", "jvishwakarma@kloudrac.com"],
        emailLink
      );
      res.status(200).send({ msg: "Successfully Signup" })
    }
  }
 


const signin = async (req: Request, res: Response) => {
  
    const email = req.body.email


    const result = await userModel.findOne({ email: email })

    // console.log(".............................................",hashPassword)
    if (result) {
      const hashPassword = result?.password as string
      const roles = result?.roles


      const match_pass = await bcrypt.compare(req.body.password, hashPassword)
      if (match_pass) {
        const TOKEN: string = generateToken({ email, roles }, `${60 * 15}s`)

        res.status(200).send({
          msg: "User logIn Successfull", userData: {
            TOKEN: TOKEN,


          }
        })
      } else {


        res.status(401).send("Wrong Password")
      }
    }
    else {

      res.status(404).send("user not found")
    }
  }

 

const verifyUserEmail = async (req: Request, res: Response, next: NextFunction) => {

  // const data:string = req.query.token as string;
  const { data } = req.body.token

  const result = await userModel.findOne({ email: data })

  if (result) {

    const updateAccount = await userModel.updateOne(
      { email: data },
      { emailVerified: 1 },
      { new: true }
    );
    res.send({ status: "Account Verified", updateAccount });

  } else {
    res.send({ status: "Invalid Url" });

  }
}




const verifyByOrganization = async (req: Request, res: Response) => {

  const { _id } = req.body;
  const { statusBy, role, status } = req.body.action


  if (status == "Approved") {
    const detail = await userModel.findOneAndUpdate({ _id }, {
      $set: {
        action: {
          role: role,
          status: status,
          statusBy: statusBy
        },
      }
    }, { new: true })

    if (detail) {
      
      const emailLink = `${""}`;
      const emailStatus = await sendMailTo(
        ["rajendrayadav900500@gmail.com"],
        emailLink
      );
      res.status(200).send({ msg: "approved succesfully" })
    }
  }

  if (status == "Rejected") {
    const detail = await userModel.findOneAndUpdate({ _id }, {
      $set: {
        action: {
          role: role,
          status: status,
          statusBy: statusBy
        },
      }
    }, { new: true })

    const emailStatus = await sendMailWhenRejected(["rajendrayadav900500@gmail.com"]);
     res.status(200).send({ msg: "rejected Account" })
    }

  if (status == "Pending") {
    const detail = await userModel.findOneAndUpdate({ _id }, {
      $set: {
        action: {
          role: role,
          status: status,
          statusBy: statusBy
        },
      }
    }, { new: true })

    const emailStatus = await sendMailwhenPending(["rajendrayadav900500@gmail.com"]);
    res.status(200).send({ msg: "account has been pending" })
  }
}



const newCustomerApplication = async (req: Request, res: Response) => {
  
   const data =  await userModel.find({ status: "none" })
     if(data){
      res.status(200).send(data)
     }
     else{
      res.status(500).send({msg:"something went wrong"})
     }
    

  }


const allApprovedUser = async (req: Request, res: Response) => {

  const result = await userModel.find({ $or: [{ $and:[{ status: "active" },{is_Admin:false}]}, {$and:[{ status: "disable" },{is_Admin:false}]}] })
   

    if (result) {
      res.status(200).send(result)
    }
    else {
      res.status(404).send({msg:"no data found"});
    }
}

const userActivateDeActivateController = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id

  const result = await userModel.findById({ _id: id })


  if (!result) {
    res.status(404).send("user not found")
  }
  else {
    if (result?.status == "active") {
      const updateStatus = await userModel.findByIdAndUpdate({ _id: req.body.id }, { status: "disable" }, { new: true })
      res.status(201).send(updateStatus)
    }
    else {
      const updateStatus = await userModel.findByIdAndUpdate({ _id: req.body.id }, { status: "active" }, { new: true })
      res.status(201).send(updateStatus)
    }
  }

}

const adminData = async (req: Request, res: Response) => {


  const email = req.body.email
  console.log(email)
  // const data=JSON.parse(email);
 const result = await userModel.findOne({ email: email })
  
    if (result) {
      const { _id,name, roles } = result
      res.status(200).send({_id: _id, name: name, roles: roles})
    }
    else{
      res.status(404).send({msg:"data not found"})
    }
  }



export {
  signin,
  signup,
  verifyUserEmail,
  verifyByOrganization,
  newCustomerApplication,
  allApprovedUser,
  adminData,
  userActivateDeActivateController

};