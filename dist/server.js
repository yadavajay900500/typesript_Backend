"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signinSignup_router_1 = __importDefault(require("../src/Routes/signinSignup.router"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userToDoList_router_1 = __importDefault(require("../src/Routes/userToDoList.router"));
const server = (0, express_1.default)();
(() => {
    body_parsar();
    cors_config();
    db_config();
    routes_config();
    global_Error_Handler();
})();
function db_config() {
    mongoose_1.default.connect("mongodb+srv://ajay:900@cluster0.umyjcyd.mongodb.net/doceree_userDetails?retryWrites=true&w=majority", (err) => {
        if (!err) {
            console.log("DB Connected Successfully");
        }
        else {
            console.log("Error: ", err);
        }
    });
}
function body_parsar() {
    server.use(express_1.default.json());
}
function cors_config() {
    server.use((0, cors_1.default)());
}
function routes_config() {
    server.use('/', signinSignup_router_1.default);
    server.use('/', userToDoList_router_1.default);
}
function global_Error_Handler() {
    server.use((err, req, res, next) => {
        // const errorStatus = req.status || 500;
        const error = err.message && [err.message] || err || "Internal Server Error";
        console.log("Global_Error_Handler", error);
        res.status(500).send({ error: "Global Error Handler" });
    });
}
//  module.exports = server;
exports.default = server;
