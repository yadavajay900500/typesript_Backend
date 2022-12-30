

// import config from './config'
// import {env} from 'process';
import * as dotenv from 'dotenv';
dotenv.config()
import express, { Express, Response, Request, NextFunction } from "express";
import SignInSignUpRoute from "../src/Routes/signinSignup.router"
import addToDoList from "../src/Routes/userToDoList.router"
import mongoose from 'mongoose';
import cors from 'cors'
import toDoListRouter from "../src/Routes/userToDoList.router";

const server: Express = express();


(() => {
    bodyParsar();
    corsConfig();
    dbConfig();
    routesConfig();
    globalErrorHandler();


})();

function dbConfig() {
    const uri = process.env.db_Url
    mongoose.connect(uri as string,(err) => {
            if (!err) {
                console.log("DB Connected Successfully");
            } else {
                console.log("Error: ", err);
            }
        }
    );
    
}


function bodyParsar() {
    server.use(express.json());
    // for parsing application/xwww-form-urlencoded
    server.use(express.urlencoded({ extended: true }))
}
function corsConfig() {
    server.use(cors());
}

function routesConfig() {
    server.use('/', SignInSignUpRoute);
    server.use('/', toDoListRouter);
}

function globalErrorHandler() {
    server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
         const errorStatus:any = res.status || 500;
        const error = err.message && [err.message] || err || "Internal Server Error";
    
        res.status(errorStatus).send(error)
    })
}


export default server;

