import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from '../Models/signinSigup.model';
import { generateToken, refreshToken } from '../Utility/token';
import { sendMailTo, sendMailwhenPending, sendMailWhenRejected } from "../Utility/nodeMailer.utilty";
const saltRounds: number = 2;

const signup = async (req: Request, res: Response) => {
  try {
    console.log("++++++++++++++++++++++++", req.body)
    const { email, password } = req.body
    const hass = await bcrypt.hash(password, saltRounds);
    const TOKEN: string = generateToken(email, `${60 * 15}s`)
    console.log(TOKEN)

    const emailLink = `http://localhost:5050/verifyEmail?token=${TOKEN}`;
    const emailStatus = await sendMailTo(
      ["rajendrayadav900500@gmail.com"],
      emailLink
    );
    const user = new userModel({
      fullname: req.body.fullname,
      email: email,
      password: hass,
      token: TOKEN
    });
    console.log("QQQQQQQQQQ", user)
    user.save(async (err) => {
      if (err) {
        console.log(err)
        res.status(500).send({ message: err });
        return;
      };
      res.status(200).send({ msg: "Successfully Signup" })
    })
  } catch (err) {
    console.log("Someting Wrong", err)
    res.status(403).json("Signup Failed!");

  }
  // res.status(200).json("Successfull Signup");
};


const SignIn = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const refToken: string = refreshToken({ email }, `${60 * 15}s`)
    const userData = userModel.findOneAndUpdate({ email: email }, { refreshToken: refToken }, async (err: Error, result: any) => {
      if (result) {
        const { roles } = result

        const match_pass = await bcrypt.compare(req.body.password, result.password)
        if (match_pass) {
          console.log("++++++)0000000000++++", result)

          console.log("?????????////", roles)
          const TOKEN: string = generateToken({ email, roles }, `${60 * 150}s`)
          console.log("$$$$$$$$$$$$4", TOKEN)
          res.status(200).send({
            msg: "User logIn Successfull", userData: {
              TOKEN: TOKEN,
              refreshToken: refToken,
              id: result._id,
              name: result.fullname
            }
          })
        } else {


          res.status(401).send("Wrong Password")
        }
      }
      if (err) {
        console.log(err)
        res.status(403).send("Data not Found")
      }
    })
  }
  catch (err) {
    console.log(err)
    res.status(403).send("Something Wrong")
  }
}

const verifyUserEmail = (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body", req.query)
  // const data:string = req.query.token as string;
  const { data } = req.body.token
  console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
  userModel.findOne({ email: data }, async (err: any, result: any) => {
    if (err) {
      next(err);
    }
    else {
      if (result) {
        console.log("+++++++++++++++", result)
        const updateAccount = await userModel.findOneAndUpdate(
          { email: data },
          { emailVerified: 1 },
          { new: true }
        );
        res.send({ status: "Account Verified", updateAccount });

      } else {
        res.send({ status: "Invalid Url" });

      }
    }
  });

};

const verifyByOrganization = async (req: Request, res: Response) => {
  console.log("???", req.body)
  const { _id } = req.body;
  const { statusBy, role, status } = req.body.action
  const detail = await userModel.findOneAndUpdate({ _id }, {
    $set: {
      action: {
        role: role,
        status: status,
        statusBy: statusBy
      },
    }
  }, { new: true })
  detail?.save(async (err, result) => {
    if (status == "Approved") {
      if (result) {
        // await userModel.updateOne({ _id }, {}, { new: true })
        const emailLink = `${""}`;
        // *********<this function is used for sending email>************//
        const emailStatus = await sendMailTo(
          ["rajendrayadav900500@gmail.com"],
          emailLink
        );
        res.status(200).send({ msg: "approved succesfully" })
      } else {
        res.status(400).send(err)
      }
    }
    console.log("!!!!!!!!!!!!!!!!!!!!!")
    if (status == "Rejected") {
      const emailStatus = await sendMailWhenRejected(
        ["rajendrayadav900500@gmail.com"]
      );
      console.log("rejected Account", status)
      res.status(200).send({ msg: "rejected Account" })

    }

    if (status == "Pending") {
      const emailStatus = await sendMailwhenPending(
        ["rajendrayadav900500@gmail.com"]
      );
      console.log("pending Account", status)
    }
  })
}


const newCustomerApplication = async (req: Request, res: Response) => {
  try {
    await userModel.find({}).then((data) => {
      function customerData(b: any) {
        const a = b.emailVerified
        return a == 1;
      }
      const newcustomer = data.filter(customerData);
      if (newcustomer) {
        res.status(200).send({ data: newcustomer })
      }
    })
    
  } catch (err) {
    console.log(err)
    res.status(403).send("User Does not Exits")
  }
}

const allApprovedUser = async (req: Request, res: Response) => {
  console.log("PPPPPPPPPPPPPPP")
  await userModel.find({}).then((data) => {
    function customerData(b: any) {
      console.log(b)
      const a = b.emailVerified
      return a == 1
    }
    const newcustomer = data.filter(customerData);
    console.log(">>>>>>>>", newcustomer)
    if (newcustomer) {
      res.status(200).send(newcustomer)
    }
    else {
      console.log('user Does Not Exits');
    }
  })

}

const userActivate_DeActivate_Controller = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id
  console.log(req.body)
  const result = await userModel.findById({ _id: id })

  console.log("no", result)
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
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>", req.body)

  const { email } = req.body
  console.log(email)
  // const data=JSON.parse(email);
  userModel.findOne({ email }, (err: any, result: any) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.status(200).send(res)
    }
  })
}


export {
  SignIn,
  signup,
  verifyUserEmail,
  verifyByOrganization,
  newCustomerApplication,
  allApprovedUser,
  adminData,
  userActivate_DeActivate_Controller
  // signupVarifycation
};