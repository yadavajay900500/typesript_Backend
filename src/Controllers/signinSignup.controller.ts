import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from '../Models/signinSigup.model';
import { generateToken, refreshToken } from '../Utility/token';
import { sendMailTo, sendMailwhenPending, sendMailWhenRejected } from "../Utility/nodeMailer.utilty";
import verifyRefreshToken from "../Utility/verifyRefreshToken";
const saltRounds: number = 2;
const secret: string = "All_is_Well";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import moment from "moment";


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
      token: TOKEN,
      market: req.body.market,
      role: req.body.role
    });
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
};




// ****************LOGIN BUSSINESSLOGIC 1 *************************//

const MAX_ATTEMPTS = 3; // after which the account should be locked
const LOCK_ACCOUNT_TIME = 2; // in minutes
let lock = {
  attempts: 0,
  isLocked: false,
  unlocksAt: null,
};
let locks: any = {};
const SignIn = (req: Request, res: Response) => {
  console.log(req.ip)
  try {
    const { email, password } = req.body
    const refToken: string = refreshToken({ email }, `${60 * 60 * 24}s`)
    if (locks[email] && locks[email].isLocked && new Date(locks[email].unlocksAt).getTime() > new Date().getTime()) {
      const initialaTime = new Date(locks[email].unlocksAt)
      const presentDate = new Date()
      const expireTime = initialaTime.getTime() - presentDate.getTime()
      return res.status(429).send({
        error: true,
        message:
          "Account locked due to many invalid attempts. You account unlocks " +
          moment(locks[email].unlocksAt).fromNow(),
      });
    }
    const userData = userModel.findOneAndUpdate({ email: email }, { refreshToken: refToken }, async (err: Error, result: any) => {
      if (result) {
        const { roles } = result
        const match_pass = await bcrypt.compare(req.body.password, result.password)
        if (match_pass) {
          delete locks[email];
          const TOKEN: string = generateToken({ email, roles }, `${60 * 15}s`)
          res.status(200).send({
            msg: "User logIn Successfull", userData: {
              TOKEN: TOKEN,
              refreshToken: refToken
            }
          })

        } else {
          locks[email] = lock;
          let ee = locks[email]
          locks[email].attempts = locks[email].attempts + 1;  // problem is here not differentialte b/w old emial and new emmail
          console.log("|||||||||||||||||", new Date(locks[email].unlocksAt).getTime() > new Date().getTime())
          console.log("111111111111111111", new Date().getTime(), new Date(locks[email].unlocksAt).getTime())
          if (locks[email].attempts >= MAX_ATTEMPTS) {
            let d = new Date();
            d.setMinutes(d.getMinutes() + LOCK_ACCOUNT_TIME);
            locks[email].isLocked = true;
            locks[email].unlocksAt = d;
          }
          res.status(401).send("Wrong Password")
        }
      }

      if (err) {
        res.status(403).send("Data not Found")
      }
    })
  }
  catch (err) {
    res.status(403).send("Something Wrong")
  }
}



// ************************* LOGIN BUSSINESSLOGIC BUCKET TOKEN 2 ****************************//
// const SignIn = (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body
//     const refToken: string = refreshToken({ email }, `${60 * 60 * 24}s`)
//     const userData = userModel.findOneAndUpdate({ email: email }, { refreshToken: refToken }, async (err: Error, result: any) => {
//       if (result) {
//         const { roles } = result
//         const match_pass = await bcrypt.compare(req.body.password, result.password)
//         if (match_pass) {
//           const TOKEN: string = generateToken({ email, roles }, `${60*15}s`)
//           res.status(200).send({
//             msg: "User logIn Successfull", userData: {
//               TOKEN: TOKEN,
//               refreshToken: refToken
//             }
//           })

//         } else {
//           res.status(401).send("Wrong Password")
//         }
//       }
//       if (err) {
//         res.status(403).send("Data not Found")
//       }
//     })
//   }
//   catch (err) {
//     res.status(403).send("Something Wrong")
//   }
// }

// ************************* LOGIN BUSSINESSLOGIC ORIGINAL ****************************//
// const SignIn = (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body
//     const refToken: string = refreshToken({ email }, `${60 * 60 * 24}s`)
//     const userData = userModel.findOneAndUpdate({ email: email }, { refreshToken: refToken }, async (err: Error, result: any) => {
//       if (result) {
//         const { roles } = result
//         const match_pass = await bcrypt.compare(req.body.password, result.password)
//         if (match_pass) {
//           const TOKEN: string = generateToken({ email, roles }, `${60*15}s`)
//           res.status(200).send({
//             msg: "User logIn Successfull", userData: {
//               TOKEN: TOKEN,
//               refreshToken: refToken
//             }
//           })

//         } else {
//           res.status(401).send("Wrong Password")
//         }
//       }
//       if (err) {
//         res.status(403).send("Data not Found")
//       }
//     })
//   }
//   catch (err) {
//     res.status(403).send("Something Wrong")
//   }
// }

const refreshTokenLogin = async (req: Request, res: Response) => {
  try {
    const { jwtToken, refreshToken } = req.body
    const verifyTokenRes: any = await verifyRefreshToken(refreshToken, jwtToken)
    const { email, password, roles } = verifyTokenRes
    const refreshTokenData = verifyTokenRes.refreshToken
    const TOKEN: string = generateToken({ email, roles }, `${60 * 15}s`)
    res.status(201).send({
      msg: "User logIn Successfull", userData: {
        TOKEN: TOKEN,
        refreshToken: refreshTokenData
      }
    })
  } catch (err) {
    console.log("????AAAAAAAAAAA???", err)
    res.status(404).send("Something Wrong")
  }
}

const verifyUserEmail = (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body.token
  userModel.findOne({ email: data }, async (err: any, result: any) => {
    if (err) {
      next(err);
    }
    else {
      if (result) {
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

// ********************************************************************************\

const verifyByOrganization = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.body
  const { statusBy, role, status } = req.body.action
  const userData = await userModel.findByIdAndUpdate({ _id: _id }, {
    $set: {
      action: {
        role: role,
        status: status,
        statusBy: statusBy
      },
    }
  }, { new: true })

  switch (status) {
    case "Approved":
      res.status(200).send({ msg: "Account Approved" });
      break;
    case "Pending":
      res.status(202).send({ msg: "Account Pending" })
      break;
    default:
      res.status(201).send({ msg: "Account Rejected" })
  }
}


// const verifyByOrganization = async (req: Request, res: Response) => {
//   const { _id } = req.body;
//   const { statusBy, role, status } = req.body.action
//   const detail = await userModel.findOneAndUpdate({ _id }, {
//     $set: {
//       action: {
//         role: role,
//         status: status,
//         statusBy: statusBy
//       },
//     }
//   }, { new: true })
//   detail?.save(async (err, result) => {
//     if (status == "Approved") {
//       if (result) {
//         // await userModel.updateOne({ _id }, {}, { new: true })
//         const emailLink = `${""}`;
//         // *********<this function is used for sending email>************//
//         const emailStatus = await sendMailTo(
//           ["rajendrayadav900500@gmail.com"],
//           emailLink
//         );
//         res.status(200).send({ msg: "approved succesfully" })
//       } else {
//         res.status(400).send(err)
//       }
//     }
//     if (status == "Rejected") {
//       const emailStatus = await sendMailWhenRejected(
//         ["rajendrayadav900500@gmail.com"]
//       );
//       console.log("rejected Account", status)
//       res.status(200).send({ msg: "rejected Account" })
//     }
//     if (status == "Pending") {
//       const emailStatus = await sendMailwhenPending(
//         ["rajendrayadav900500@gmail.com"]
//       );
//       res.status(200).send({ msg: "account has been pending" })
//     }
//   })
// }


const newCustomerApplication = async (req: Request, res: Response) => {
  console.log("///////dsknckdkcnksdnc/////", req.body)

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
  console.log("////////////", req.body)
  await userModel.find({}).then((data) => {
    function customerData(b: any) {
      const a = b.emailVerified
      return a == 1
    }
    const newcustomer = data.filter(customerData);

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
  userModel.findOne({ email: email }, (err: any, result: any) => {
    if (err) {
      console.log("errr", err)
    }
    if (result) {
      const { _id, fullname, roles } = result
      res.status(200).send({
        _id: _id,
        name: fullname,
        roles: roles
      })
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
  userActivate_DeActivate_Controller,
  refreshTokenLogin
};