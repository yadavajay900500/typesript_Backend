"use strict";
// import { google } from "googleapis";
// import nodemailer from 'nodemailer';
// const { OAuth2 } = google.auth;
// const clientId: string = "434313587437-o18cmi86e2m9in0pkiiqa5gt5o7copp9.apps.googleusercontent.com";
// const clientSecret: string = "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";
// const refreshToken = "1//04CuiRbI3vwYtCgYIARAAGAQSNwF-L9IrhUg8yDp4F8Nou4cfuA1CqztKL4C0JaIxeokfI8TH_FTsVPiTeGf8au9EcBqgA7XzuGw";
// // const redirectUri: string = "https://developers.google.com/oauthplayground";
// const redirectUri: string = "https://developers.google.com/oauthplayground";
// const OAuth2_client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
// // console.log("#########", OAuth2_client)
// const ttoken = () => {
//     return OAuth2_client.setCredentials({ refresh_token: refreshToken });
// }
// console.log(">>>>>>>>>>>>>>",ttoken)
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
//         refreshToken: refreshToken,
//         // accessToken
//         accessToken: "ya29.a0AeTM1if-MrnFkZSV9O8RbLDbUi1WnRWfX4rj4b0FOglI0Xr8l8OYqXekKm2A-IQtlsuWyPGMchxx7eF-JoDMKCtxDfumpfbPrp0ojm-3bruzUxpt3sdGlNxlkKRA-UHRv0e2fYEY_jW9xkwWKeOIfgxUovHraCgYKAQASARESFQHWtWOmmp78yfVYFsThZy9FuD4AbA0163"
//     },
// });
// const sendMailTo = async (emailsArr: string[], link: string) => {
//     var email = {
//         to: emailsArr,
//         from: 'yadavajay900500@gmail.com', //registered Email on sendgrid
//         subject: 'Verify Account',
//         text: 'Account Authantication',
//         html: `<div style=background-color:blue; height:400px;width:300px>
//         <a href=${link} >
//          <button style="color: green"> Verify Account </button>
//           </a>
//         </div>`
//     };
//     const result = new Promise((resolve, reject) => {
//         transporter.sendMail(email, function (err, res) {
//             if (err) {
//                 reject(err)
//             }
//             resolve(res)
//         });
//     })
//     return await result
// }
// export { sendMailTo }
