// import { google } from "googleapis";
// import nodemailer from 'nodemailer';
// const { OAuth2 } = google.auth;


// const clientId: string = "434313587437-o18cmi86e2m9in0pkiiqa5gt5o7copp9.apps.googleusercontent.com";
// const clientSecret: string = "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";
// // const refreshToken = "1//04CuiRbI3vwYtCgYIARAAGAQSNwF-L9IrhUg8yDp4F8Nou4cfuA1CqztKL4C0JaIxeokfI8TH_FTsVPiTeGf8au9EcBqgA7XzuGw";
// // const redirectUri: string = "https://developers.google.com/oauthplayground";
// const redirectUri: string = "https://developers.google.com/oauthplayground";



// const OAuth2_client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)


// // console.log("#########", OAuth2_client)


// // const ttoken = () => {
// //     return OAuth2_client.setCredentials({ refresh_token: refreshToken });

// // }
// // OAuth2_client.setCredentials({ refresh_token: refreshToken })






// // const accessToken = OAuth2_client.getAccessToken()
// // accessToken.then(function(result) {
// //     console.log("EEEEEEEEEEEEEEEEEE",result) // "Some User token"
// //     const accett=result
// //  })

// // let accessToken = function () {
// //     return OAuth2_client.getAccessToken()
// // }

// let userToken = async () => {
//     await OAuth2_client.getAccessToken()
//     console.log("PPPPPp") // your data
// }
// console.log("!!!!!!!!!!!!!!", userToken)
// //  const accessToken = oauth2Client.getAccessToken();

// let transporter = nodemailer.createTransport({

//     service: 'gmail',

//     auth: {
//         type: 'OAuth2',
//         user: "yadavajay900500@gmail.com",
//         clientId: clientId,
//         clientSecret: clientSecret,
//         refreshToken:  "1//04BfVgFcdv8-RCgYIARAAGAQSNwF-L9IrJbaHW86q_zmX1elb7ESSSls--Xp72I_Mk35mhdOqyoJj7bpy2UEdlbsx7H-ihZubvIk",
//         // accessToken
//         accessToken: "ya29.a0AX9GBdWFSi3YDHGfpSjMeEpITTLDQnQG_pIB7HCi7TwzYI6KVAYSnIiy_LUtfZRxhbKutB-YJpXMTEtZU4pRV3bfeRN5gEQsIQcLgcu36JV4EXgtWaxDVPua8Rgi6OJcEY0ytcUe4QHF2yK1Yg9o22zAhZnNaCgYKAbESARESFQHUCsbCK91hzgqt2rvJVaYu-A8WdQ0163"
//     },

// });
// ***************************************************************

import nodemailer from 'nodemailer'
// import SMTPTransport from 'nodemailer-smtp-transport'
import {google} from 'googleapis'
 
// console.log("!@#$%^&()!@#$%^&()$%^&*(")
const CLIENT_ID = '630668604540-9gelb99035e2urd5mkogu2iifomhg3li.apps.googleusercontent.com'
const CLIENT_SECRET = "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"
const REDIRECT_URI ='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN= "1//04V8J9yloPvbFCgYIARAAGAQSNwF-L9IryBz4snmaMSm9_pDXGQXUP6Po8FiVSza2HcSaA1b4mduIEKbALcLtRmWG7FWr1dUez9M"



const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,  CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN })


const accessToken = 'ya29.a0AeTM1idF7LjB88Bs92Muv65t1-ctKepZag4B-3R1zALR63eKQ5pRsL3pRqlE9QuUVmOuUOpwQejXi19M2kRUm1N4hp94A_ehFaUR5P2q_Ggae6rByTVxwvK0zB0VhNz44vNQZsgFiJigMxXIA8usDuZv685aaCgYKAcYSARASFQHWtWOmw8hPkH0DxE7NEN3uzR9U-g0163'


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        type:'OAuth2',
        user:'jitendra7518888@gmail.com',
        clientId :'630668604540-9gelb99035e2urd5mkogu2iifomhg3li.apps.googleusercontent.com',
        clientSecret : "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",
        refreshToken: "1//04V8J9yloPvbFCgYIARAAGAQSNwF-L9IryBz4snmaMSm9_pDXGQXUP6Po8FiVSza2HcSaA1b4mduIEKbALcLtRmWG7FWr1dUez9M",
        accessToken:'ya29.a0AeTM1idF7LjB88Bs92Muv65t1-ctKepZag4B-3R1zALR63eKQ5pRsL3pRqlE9QuUVmOuUOpwQejXi19M2kRUm1N4hp94A_ehFaUR5P2q_Ggae6rByTVxwvK0zB0VhNz44vNQZsgFiJigMxXIA8usDuZv685aaCgYKAcYSARASFQHWtWOmw8hPkH0DxE7NEN3uzR9U-g0163',

    }, 
})

//console.log(transport)

// let transporter = nodemailer.createTransport("SMTP",{
//     // host: "www.google.mail.com",
//     // port: 587,
//     // secure: false, // true for 465, false for other ports
//     auth: {
//       user: "jitendra7518888@gmail.com", // generated ethereal user
//       pass: "@@iloveyou", // generated ethereal password
//     },
//   });


//const mailer = nodemailer.createTransport(sgTransport(options));


const sendMailTo = async (emailsArr: string[], link: string) => {
    var email = {
        to: emailsArr,
        from: 'jitendra7518888@gmail.com', //registered Email on sendgrid
        subject: 'Verify Account',
        text: 'Account Authantication',
        html: `<div style=background-color:blue; height:400px;width:300px>
        <a href=${link} >
         <button style="color: green"> Verify Account </button>
          </a>
        </div>`
    };

    const result = new Promise((resolve, reject) => {

        transporter.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}

const sendMailWhenRejected = async (emailsArr:any) => {
    var email = {
        to: emailsArr,
        // from: 'yadavajay900500@gmail.com', //registered Email on sendgrid
        from: 'jitendra7518888@gmail.com', //registered Email on sendgrid

        subject: 'Your account Status',
        text: 'Your Application Form is Rejected Please Contact your near Bank branch',
        html: `<h1> <strong>Thankyou for choosing doceree Account is not approved please provided
        the orginal document and contact your near doceree branch</strong>
          </h1>`
    };
    const result = new Promise((resolve, reject) => {
        transporter.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });
    })
    return await result
}
const sendMailwhenPending = async (emailsArr:any) => {
    var email = {
        to: emailsArr,
        // from: 'yadavajay900500@gmail.com', //registered Email on sendgrid
        from: 'jitendra7518888@gmail.com', //registered Email on sendgrid

        subject: 'Your  account is Pending',
        text: 'Your Application form on pending please provide the original document and upload the dodument again',
        html: `<h1 Thankyou for choosing doceree for services !
          </h1>`
    };
    const result = new Promise((resolve, reject) => {
        transporter.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });
    })
    return await result
}

export { sendMailTo,sendMailWhenRejected,sendMailwhenPending }




