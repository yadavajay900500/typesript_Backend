"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userToDoList_controller_1 = require("../Controllers/userToDoList.controller");
const toDoListRouter = (0, express_1.Router)();
(() => {
    postRequest();
})();
function postRequest() {
    toDoListRouter.post("/add", userToDoList_controller_1.addToDoListAdd);
    toDoListRouter.post("/remove", userToDoList_controller_1.addToDoListRemove);
    toDoListRouter.post("/update", userToDoList_controller_1.addToDoListUpdate);
}
exports.default = toDoListRouter;
