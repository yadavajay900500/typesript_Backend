

import nodemailer from 'nodemailer'
import {google} from 'googleapis'
 
const CLIENT_ID = process.env.client_Id
const CLIENT_SECRET = process.env.client_Secret
const REDIRECT_URI = process.env.redirect_Uri
const REFRESH_TOKEN= process.env.refresh_Token



const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,  CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN })


const accessToken = process.env.access_Token


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        type:'OAuth2',
        user:'jitendra7518888@gmail.com',
        clientId :process.env.client_Id,
        clientSecret : process.env.client_Secret,
        refreshToken:process.env.refresh_Token,
        accessToken:process.env.access_Token

    }, 
})




const sendMailTo = async (emailsArr: string[], link: string) => {
    var email = {
        to: emailsArr,
        from: 'jitendra7518888@gmail.com', 
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
       
        from: 'jitendra7518888@gmail.com', 

        subject: 'Your account Status',
        text: 'Your Application Form is Rejected Please Contact to admin',
        html: `<h1> <strong>Thankyou for choosing doceree Account is not approved please provided
        the orginal document and contact to the Admin</strong>
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
       
        from: 'jitendra7518888@gmail.com', 

        subject: 'Your  account is Pending',
        text: 'Your Application form on pending please provide the original document and upload the document again',
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




