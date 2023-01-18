import express, { Express, Response, Request, NextFunction } from "express";
import SignInSignUpRoute from "../src/Routes/signinSignup.router"
import addToDoList from "../src/Routes/userToDoList.router"
import mongoose from 'mongoose';
import cors from 'cors'
import toDoListRouter from "../src/Routes/userToDoList.router";
import awsPresignedUrl from "../src/Routes/awsPresignedUrl.router"

const server: Express = express();


(() => {
    body_parsar();
    cors_config();
    db_config();
    routes_config();
    global_Error_Handler();


})();

function db_config() {
    mongoose.connect(
        "mongodb+srv://ajay:900@cluster0.umyjcyd.mongodb.net/DOCEREE?retryWrites=true&w=majority",
        (err) => {
            if (!err) {
                console.log("DB Connected Successfully");
            } else {
                console.log("Error: ", err);
            }
        }
    );
    
}


function body_parsar() {
    server.use(express.json());
    // for parsing application/xwww-form-urlencoded
    server.use(express.urlencoded({ extended: true }))
}
function cors_config() {
    server.use(cors());
}

function routes_config() {
    server.use('/', SignInSignUpRoute);
    server.use('/', toDoListRouter);
    server.use('/', awsPresignedUrl);
}

function global_Error_Handler() {
    server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        // const errorStatus = req.status || 500;
        const error = err.message && [err.message] || err || "Internal Server Error";
        console.log("Global_Error_Handler", error)
        res.status(500).send({ error: "Global Error Handler" })
    })
}


//  module.exports = server;
export default server;

